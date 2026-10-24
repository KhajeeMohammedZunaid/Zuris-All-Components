/**
 * Liquid Glass Optics & Fluid Dynamics GLSL Shaders
 * 
 * Hardware-accelerated WebGL 2.0 shader pipeline modeling:
 * - Continuous Cauchy-dispersion spectral refraction
 * - Superelliptic surface signed distance fields (SDF)
 * - Fluidic wave crest propagation and caustic focusing
 * - Multi-scale mip-pyramid optical bloom and photorealistic diffusion
 */

/** Vertex shader transforming a fullscreen clip-space triangle */
export const liquidGlassLogoVertex = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

/** Primary fragment shader performing physical optics and fluid raymarching */
export const liquidGlassLogoRender = `#version 300 es
precision highp float;

// Input Texture Samplers
uniform sampler2D uLogo;
uniform sampler2D uText;

// Viewport & Scale Uniforms
uniform vec2 uResolution;
uniform float uDpr;
uniform float uUnit;
uniform vec2 uLogoBox;
uniform vec2 uTextBox;
uniform float uTextWidth;

// Simulation Clock & Transition States
uniform float uTime;
uniform float uSettle;
uniform float uArtScale;
uniform float uWordmarkEnabled;

// Environmental & Material Parameters
uniform vec3 uTile;
uniform float uTileEnabled;
uniform float uPageLight;
uniform float uDepth;
uniform float uDispersion;
uniform float uRelief;
uniform float uCaustics;
uniform float uHighlights;
uniform float uEchoTint;
uniform float uInnerWallFocus;
uniform float uDropSize;
uniform float uDropStrength;
uniform float uDecay;

// Secondary Fluid Droplet Uniforms
uniform vec4 uDrop;      // [radius, coreRadius, rimStretch, centerFactor]
uniform vec4 uDropLens;  // [edgeMagnify, profileExponent, rippleAmplitude, wavelength]
uniform vec4 uDropWave;  // [phase, coreRippleRatio, dispersionScale, unused]

out vec4 outColor;

// Mathematical Constants
const float PI = 3.14159265358979323846;
const int NUM_SPECTRAL_BANDS = 32;

// Utility functions
float sqr(float v) { return v * v; }
float gaussianBell(float offset, float width) { return exp(-sqr(offset / max(width, 0.001))); }
float smoothEase(float edge0, float edge1, float x) { return smoothstep(edge0, edge1, x); }

// Spectral power distribution across the visible spectrum (400nm - 700nm)
vec3 evaluateSpectrum(float normalizedWavelength) {
  float lambda = 400.0 + 300.0 * normalizedWavelength;
  vec3 rgb = vec3(0.0);
  if (lambda < 440.0) {
    rgb = vec3((440.0 - lambda) / 120.0, 0.0, 1.0);
  } else if (lambda < 490.0) {
    rgb = vec3(0.0, (lambda - 440.0) / 50.0, 1.0);
  } else if (lambda < 510.0) {
    rgb = vec3(0.0, 1.0, (510.0 - lambda) / 20.0);
  } else if (lambda < 580.0) {
    rgb = vec3((lambda - 510.0) / 70.0, 1.0, 0.0);
  } else if (lambda < 645.0) {
    rgb = vec3(1.0, (645.0 - lambda) / 65.0, 0.0);
  } else {
    rgb = vec3(1.0, 0.0, 0.0);
  }
  float lowSens = smoothEase(400.0, 430.0, lambda);
  float highSens = smoothEase(650.0, 700.0, lambda);
  return rgb * mix(0.2, 1.0, lowSens) * mix(1.0, 0.65, highSens);
}

// Cauchy dispersion index of refraction for optical glass
float calculateGlassIOR(float normalizedWavelength, float dispersionSpread) {
  float lambdaMicrons = 0.4 + 0.3 * normalizedWavelength;
  return 1.38 + (0.04 / (lambdaMicrons * lambdaMicrons) - 0.12) * dispersionSpread;
}

// Sample texture with anti-aliased bounds clipping and level-of-detail stability
vec4 sampleArtworkLOD(sampler2D imageSampler, vec2 coords, vec2 boundingBox) {
  vec2 uv = 0.5 + coords / boundingBox;
  vec2 texSize = vec2(textureSize(imageSampler, 0));
  vec2 footprint = texSize / max(boundingBox * uDpr, vec2(1.0));
  float lodLevel = max(0.0, log2(max(footprint.x, footprint.y)));
  lodLevel += (1.0 - smoothEase(0.20, 0.36, uTime)) * 2.2;
  vec4 sampleColor = textureLod(imageSampler, uv, lodLevel);
  float insideMask = step(0.0, uv.x) * step(0.0, uv.y) * step(uv.x, 1.0) * step(uv.y, 1.0);
  return sampleColor * insideMask;
}

// Superelliptic radius and normal calculation for rounded rectangular glass geometry
float superellipticRadius(vec2 pt, float exponent) {
  vec2 absPt = max(abs(pt), vec2(0.00001));
  return pow(pow(absPt.x, exponent) + pow(absPt.y, exponent), 1.0 / exponent);
}

vec2 superellipticNormal(vec2 pt, float exponent) {
  vec2 absPt = max(abs(pt), vec2(0.00001));
  return normalize(sign(pt) * pow(absPt, vec2(exponent - 1.0)) + vec2(0.000001));
}

// Pseudo-random noise primitives for micro-surface topography
float pseudoHash(float n) {
  return fract(sin(n * 127.1 + 311.7) * 43758.5453);
}

float edgeContourNoise(float arcPos) {
  float i = floor(arcPos);
  float f = fract(arcPos);
  f = f * f * (3.0 - 2.0 * f);
  return mix(pseudoHash(i), pseudoHash(i + 1.0), f);
}

// Micro-glint generators for physical glass surface imperfections
float generateSpecks(float arcPos, float dist, float featureSize, float seed) {
  float interval = featureSize * 22.0;
  float cellId = floor(arcPos / interval);
  float activeMask = step(0.7, pseudoHash(cellId + seed));
  float centerPos = (cellId + 0.2 + 0.6 * pseudoHash(cellId + seed + 17.0)) * interval;
  float lateralOffset = (pseudoHash(cellId + seed + 31.0) - 0.5) * featureSize * 0.6;
  float dashLength = featureSize * (2.5 + 4.0 * pseudoHash(cellId + seed + 53.0));
  return activeMask * gaussianBell(arcPos - centerPos, dashLength) * gaussianBell(dist - lateralOffset, featureSize * 0.35);
}

float generateDriftingSpecks(float arcPos, float dist, float featureSize, float seed, float time) {
  float interval = featureSize * 22.0;
  float cellId = floor(arcPos / interval);
  float cumulativeGlints = 0.0;
  for (int offset = -1; offset <= 1; offset++) {
    float id = cellId + float(offset);
    float activeMask = step(0.7, pseudoHash(id + seed));
    float oscillationRate = 2.5 + 3.0 * pseudoHash(id + seed + 71.0);
    float oscillationPhase = 6.2831853 * pseudoHash(id + seed + 89.0);
    float centerPos = (id + 0.2 + 0.6 * pseudoHash(id + seed + 17.0)) * interval + sin(time * oscillationRate * 0.5 + oscillationPhase) * interval * 0.05;
    float lateralOffset = (pseudoHash(id + seed + 31.0) - 0.5) * featureSize * 0.6 + sin(time * oscillationRate + oscillationPhase) * featureSize * 1.6;
    float dashLength = featureSize * (2.5 + 4.0 * pseudoHash(id + seed + 53.0));
    cumulativeGlints += activeMask * gaussianBell(arcPos - centerPos, dashLength) * gaussianBell(dist - lateralOffset, featureSize * 0.35);
  }
  return min(cumulativeGlints, 1.0);
}

float calculateEdgeWarp(float arcLength, float seed) {
  float lowFreq = edgeContourNoise(arcLength / (uUnit * 0.037) + seed) - 0.5;
  float highFreq = edgeContourNoise(arcLength / (uUnit * 0.008) + seed + 29.0) - 0.5;
  return uUnit * (lowFreq * 0.0017 + highFreq * 0.0008);
}

vec2 computeGlassMicroPores(float arcLength, float dist, float seed) {
  if (abs(dist) > uUnit * 0.011) return vec2(0.0);
  float spacing = uUnit * 0.022;
  float cellId = floor(arcLength / spacing);
  vec2 poreResponse = vec2(0.0);
  for (int offset = -1; offset <= 1; offset++) {
    float id = cellId + float(offset) + seed;
    float isVisible = step(0.63, pseudoHash(id));
    float centerPos = (cellId + float(offset) + 0.15 + 0.7 * pseudoHash(id + 17.0)) * spacing;
    float crossDist = (pseudoHash(id + 31.0) - 0.5) * uUnit * 0.009;
    float poreSpan = uUnit * (0.0022 + 0.0035 * pseudoHash(id + 53.0));
    float poreDepth = max(0.35 / uDpr, uUnit * (0.0007 + 0.0012 * pseudoHash(id + 71.0)));
    vec2 normalizedCoord = vec2((arcLength - centerPos) / poreSpan, (dist - crossDist) / poreDepth);
    normalizedCoord.x += normalizedCoord.y * (pseudoHash(id + 89.0) - 0.5) * 0.55;
    float radius = length(normalizedCoord);
    float aaThreshold = max(0.18, 0.4 / (uDpr * poreDepth));
    float cavityDepth = gaussianBell(radius, 0.65);
    float lipHighlight = gaussianBell(radius - 1.0, aaThreshold);
    float directionalGlint = 0.25 + 0.75 * max(dot(normalizedCoord / max(radius, 0.001), normalize(vec2(-0.4, 0.8))), 0.0);
    poreResponse += vec2(cavityDepth, lipHighlight * directionalGlint) * isVisible;
  }
  return min(poreResponse, vec2(1.0));
}

vec3 calculateExteriorReflection(vec3 specularLight, float surfaceCoverage) {
  vec3 plateShadow = mix(vec3(0.40, 0.46, 0.56), uTile * 0.86, uEchoTint);
  return mix(specularLight, plateShadow * surfaceCoverage, uPageLight);
}

// Global accumulator for per-channel chromatic refraction coverage
vec3 gRefractedSpectralCoverage;

// Primary chromatic refraction pass simulating dispersive glass optics
vec4 computeRefractedArtwork(vec2 pos, vec2 surfaceNormXY, float scaleFactor, float glassVisibility, float chromaticFactor, float distToSurface) {
  vec3 surfaceNormal = normalize(vec3(surfaceNormXY, 1.0));
  vec3 accumulatedColor = vec3(0.0);
  vec3 accumulatedWeights = vec3(0.0);
  float accumulatedAlpha = 0.0;
  float minSpectralAlpha = 1.0;
  float maxSpectralAlpha = 0.0;
  gRefractedSpectralCoverage = vec3(0.0);

  float dispersionStrength = uDispersion * chromaticFactor * mix(0.85, mix(2.2, 1.5, smoothEase(0.28, 0.9, uTime)), smoothEase(0.25, 0.33, uTime));
  vec3 centralRay = refract(vec3(0.0, 0.0, -1.0), surfaceNormal, 1.0 / calculateGlassIOR(0.5, dispersionStrength));
  vec2 centralOffset = centralRay.xy / max(-centralRay.z, 0.25) * uUnit * uDepth * 0.80 * scaleFactor;

  for (int band = 0; band < NUM_SPECTRAL_BANDS; band++) {
    float spectralT = float(band) / float(NUM_SPECTRAL_BANDS - 1);
    float ior = calculateGlassIOR(spectralT, dispersionStrength);
    vec3 refractedRay = refract(vec3(0.0, 0.0, -1.0), surfaceNormal, 1.0 / ior);
    vec2 lateralOffset = refractedRay.xy / max(-refractedRay.z, 0.25) * uUnit * uDepth * 0.80 * scaleFactor;

    float currentArtScale = uArtScale;
    float magnificationFactor = 1.0;

    float baseSphereRadius = uUnit * scaleFactor * 0.5;
    float sphereFocusProg = 1.0 - smoothEase(0.225, 0.335, uTime);
    float normalizedRadius = min(length(pos) / max(baseSphereRadius, 1.0), 1.0);
    float openingProgress = 1.0 - smoothEase(0.19, 0.265, uTime);
    float radialProfile = mix(0.7 + 0.6 * sqr(normalizedRadius), 1.0 - 0.9 * sqr(normalizedRadius), openingProgress);

    vec2 bubblePoint = pos * radialProfile + lateralOffset * mix(0.35, 0.12, openingProgress);
    bubblePoint += vec2(0.025, 0.10) * uUnit * openingProgress;
    bubblePoint += (lateralOffset - centralOffset) * openingProgress * 1.6;

    vec2 finalSampleCoord = mix(pos + lateralOffset, bubblePoint, sphereFocusProg);
    vec4 inkColor = sampleArtworkLOD(uLogo, finalSampleCoord, uLogoBox * currentArtScale * magnificationFactor);

    inkColor *= mix(1.0, 1.0 - smoothEase(0.72, 0.86, normalizedRadius), openingProgress);

    float chromaticBoundaryShift = (spectralT - 0.5) * uUnit * scaleFactor * 0.018 * uDispersion * chromaticFactor;
    inkColor *= 1.0 - smoothstep(-0.8 / uDpr, 0.8 / uDpr, distToSurface - chromaticBoundaryShift);

    minSpectralAlpha = min(minSpectralAlpha, inkColor.a);
    maxSpectralAlpha = max(maxSpectralAlpha, inkColor.a);

    vec3 bandWeight = evaluateSpectrum(spectralT);
    accumulatedColor += inkColor.rgb * bandWeight;
    accumulatedAlpha += inkColor.a * (bandWeight.r + bandWeight.g + bandWeight.b);
    gRefractedSpectralCoverage += inkColor.a * bandWeight;
    accumulatedWeights += bandWeight;
  }

  accumulatedColor /= accumulatedWeights;
  gRefractedSpectralCoverage /= accumulatedWeights;

  float edgeCoating = smoothEase(-uUnit * scaleFactor * 0.022, 0.0, distToSurface);
  accumulatedColor.g *= 1.0 - 0.65 * edgeCoating * (maxSpectralAlpha - minSpectralAlpha);

  float thinFilmEffect = (maxSpectralAlpha - minSpectralAlpha) * (1.0 - smoothEase(0.19, 0.30, uTime));
  thinFilmEffect *= 1.0 - smoothEase(-uUnit * scaleFactor * 0.08, -uUnit * scaleFactor * 0.025, distToSurface);
  accumulatedColor.r += accumulatedColor.b * thinFilmEffect * 0.80;
  accumulatedColor.b += accumulatedColor.r * thinFilmEffect * 0.60;
  accumulatedColor.g *= 1.0 - thinFilmEffect * 0.55;
  accumulatedAlpha /= (accumulatedWeights.r + accumulatedWeights.g + accumulatedWeights.b);

  float diffuseLight = max(dot(surfaceNormal, normalize(vec3(-0.4, 0.6, 1.0))), 0.0);
  vec3 tintProfile = mix(vec3(0.90, 0.93, 0.95), vec3(0.84, 0.86, 0.89), smoothEase(0.21, 0.40, uTime));
  vec3 balanceVector = mix(tintProfile, vec3(0.87, 0.88, 0.885), smoothEase(0.75, 1.22, uTime));

  accumulatedColor *= balanceVector * ((0.90 + 0.10 * diffuseLight + glassVisibility * uCaustics * 0.04) *
    ((0.975 + 0.025 * sin(pos.y / uUnit * PI)) * (1.0 + 0.09 * smoothEase(0.75, 1.22, uTime) + 0.03 * (1.0 - smoothEase(0.2, 0.5, uTime)))));

  return vec4(accumulatedColor, accumulatedAlpha);
}

// Icon plate liquid glass simulation stage
vec4 evaluateIconPlate(vec2 pos) {
  float t = uTime;
  float settleProg = smoothEase(0.0, 1.0, uSettle);
  float enterProg = smoothEase(0.025, 0.16, t);
  vec4 restingArtwork = sampleArtworkLOD(uLogo, pos, uLogoBox * uArtScale);

  if (t > 1.58) return restingArtwork * settleProg;
  if (enterProg < 0.001) return vec4(0.0);

  float cornerShape = 2.0 + 3.0 * smoothEase(0.29, 0.36, t);
  float expansionFactor = enterProg * (0.64 + 0.41 * (1.0 - exp(-max(t - 0.16, 0.0) * 5.8)));
  float collapseFactor = 1.0 - smoothEase(1.33, 1.52, t);
  float activeScale = max(0.001, mix(expansionFactor * mix(0.48, 1.0, collapseFactor), 1.0, settleProg));

  float halfBoundary = uUnit * 0.5 * activeScale;
  float superNormRadius = superellipticRadius(pos / halfBoundary, cornerShape);
  float signedDist = (superNormRadius - 1.0) * halfBoundary;
  float aaWidth = max(fwidth(signedDist), 0.65);
  float plateMask = 1.0 - smoothstep(-aaWidth, aaWidth, signedDist);
  float glassPresence = (1.0 - smoothEase(1.05, 1.4, t)) * collapseFactor * (1.0 - settleProg);
  float visibilityFade = smoothEase(0.12, 0.165, t) * (1.0 - smoothEase(1.39, 1.53, t));

  if (signedDist > uUnit * 0.10) return vec4(0.0);

  vec2 normalOutward = superellipticNormal(pos / halfBoundary, cornerShape);
  vec2 radialDir = normalize(pos + vec2(0.001));
  float diagonalBias = max(0.0, 2.0 * radialDir.x * radialDir.y);
  float shoulderStart = 0.6 + 0.18 * smoothEase(0.66, 1.15, t) * (1.0 - diagonalBias) + 0.16 * smoothEase(1.0, 1.22, t) * diagonalBias;
  float shoulderCurve = smoothEase(shoulderStart, 1.0, superNormRadius);

  float surfaceSlope = (0.04 * superNormRadius + (0.85 + 0.2 * (1.0 - smoothEase(0.28, 0.75, t))) * shoulderCurve * shoulderCurve) * glassPresence * uDropStrength;
  surfaceSlope += (1.0 - smoothEase(0.18, 0.42, t)) * superNormRadius * 0.32 * uDropStrength;

  vec2 opticalDirection = normalize(mix(normalOutward, normalize(pos + vec2(0.001)), 0.95));
  float astigmaticWarp = 0.8 + 0.4 * radialDir.x * radialDir.y;
  vec2 refractionNorm = opticalDirection * surfaceSlope * astigmaticWarp * (1.0 - settleProg);

  vec4 refractedColor = computeRefractedArtwork(pos, refractionNorm, activeScale, glassPresence, 1.0, signedDist);
  float directIllumination = 0.5 + 0.5 * dot(normalOutward, normalize(vec2(-0.5, 0.9)));
  vec3 channelCoverage = gRefractedSpectralCoverage;

  float plateLuminance = smoothEase(0.3, 0.8, dot(uTile, vec3(0.299, 0.587, 0.114)));
  vec3 plateBaseColor = uTile * (mix(0.55, 0.96, plateLuminance) + mix(0.45, 0.04, plateLuminance) * (1.0 - min(superNormRadius, 1.0)));
  plateBaseColor += vec3(0.004, 0.007, 0.01) * gaussianBell(superNormRadius - 0.75, 0.5);

  vec3 compositeRGB = refractedColor.rgb + plateBaseColor * (1.0 - channelCoverage) * glassPresence * uTileEnabled;
  float plateAlphaDecay = mix((1.0 - smoothEase(1.08, 1.36, t)) * (1.0 - settleProg), glassPresence, uPageLight);
  float compositeAlpha = max(refractedColor.a, plateAlphaDecay * uTileEnabled);

  // Front spherical highlight reflection
  vec2 sphereCoord = pos / halfBoundary;
  vec3 sphereNormalVec = normalize(vec3(sphereCoord, sqrt(max(0.001, 1.0 - dot(sphereCoord, sphereCoord)))));
  vec3 sphereReflected = reflect(vec3(0.0, 0.0, -1.0), sphereNormalVec);
  float lightDrift = mix(-0.12, 0.20, smoothEase(0.13, 0.30, t));
  float softboxProfile = gaussianBell(sphereReflected.x - lightDrift, 1.05) * gaussianBell(sphereReflected.y - 0.56, 0.52);
  float sphericalHighlight = softboxProfile * (1.0 - smoothEase(0.245, 0.36, t)) * glassPresence * uHighlights * 0.70;
  compositeRGB += vec3(0.50, 0.61, 0.72) * sphericalHighlight * (1.0 - refractedColor.a * 0.85);
  compositeAlpha = max(compositeAlpha, sphericalHighlight);

  // Surface relief & perimeter glints
  float arcLength = atan(pos.y, pos.x) * uUnit * 0.5;
  float grainScale = uUnit * 0.03;
  float fullyDeveloped = smoothEase(0.23, 0.48, t);
  float cornerExposure = smoothEase(0.12, 0.8, -2.0 * radialDir.x * radialDir.y);
  float reliefMagnitude = activeScale * fullyDeveloped * (0.2 + 0.8 * cornerExposure);
  float uniformEdgeWarp = calculateEdgeWarp(arcLength, 0.0) * reliefMagnitude;

  float rimSDF = signedDist + uniformEdgeWarp;
  float innerSDF = signedDist + uniformEdgeWarp * 0.7 + calculateEdgeWarp(arcLength, 41.0) * reliefMagnitude * 0.4;
  float innerSecondarySDF = signedDist + uniformEdgeWarp * 0.45 + calculateEdgeWarp(arcLength, 83.0) * reliefMagnitude * 0.6;
  float wallThickness = 0.75 + 0.5 * edgeContourNoise(arcLength / (uUnit * 0.013) + 13.0);

  float normalizedPerimeter = arcLength / (uUnit * 0.5);
  float dynamicRimBob = uUnit * 0.0025 * fullyDeveloped * (0.6 * sin(7.0 * normalizedPerimeter + 0.4) * sin(t * 6.3 + 1.0) + 0.4 * sin(3.0 * normalizedPerimeter + 2.0) * sin(t * 4.1));
  float rimContourSDF = rimSDF + dynamicRimBob;
  float shimmerPattern = mix(edgeContourNoise(arcLength / grainScale), edgeContourNoise(arcLength / grainScale + 211.0), 0.5 + 0.5 * sin(t * 5.0 + 6.2831853 * edgeContourNoise(arcLength / (grainScale * 3.0) + 7.0)));
  float rimCrest = gaussianBell(rimContourSDF + uUnit * 0.002, uUnit * 0.0018 * wallThickness + aaWidth * 0.3) * (0.6 + 0.8 * shimmerPattern);

  float centerDecayProg = 1.0 - smoothEase(0.62, 0.92, t);
  float innerCrest = centerDecayProg * gaussianBell(innerSDF + uUnit * 0.012, uUnit * 0.0025 / wallThickness + aaWidth * 0.2) * (0.55 + 0.9 * edgeContourNoise(arcLength / grainScale + 41.0));
  float innerSecondaryCrest = centerDecayProg * gaussianBell(innerSecondarySDF + uUnit * 0.022, uUnit * 0.0018 * wallThickness + aaWidth * 0.1) * (0.5 + edgeContourNoise(arcLength / grainScale + 83.0));

  float keyLightIntensity = pow(directIllumination, 5.0);
  float rimVisibilityFactor = 1.0 - 0.55 * smoothEase(0.75, 1.22, t);
  float lowerRightFill = pow(0.5 + 0.5 * dot(normalOutward, normalize(vec2(0.8, -0.6))), 5.0);
  lowerRightFill *= smoothEase(-0.25, -0.05, pos.x / uUnit) * (1.0 - smoothEase(-0.22, -0.02, pos.y / uUnit));

  vec2 insetCoord = pos - vec2(0.002, -0.002) * uUnit * activeScale;
  float wallSeparation = (0.055 - 0.023 * smoothEase(0.18, 0.34, t)) + 0.050 * smoothEase(0.14, 0.50, t) * (1.0 - 0.5 * smoothEase(0.80, 1.22, t));
  float insetHalfBoundary = halfBoundary - wallSeparation * uUnit * activeScale;
  float insetCornerShape = max(2.0, 2.0 + (cornerShape - 2.0) * smoothEase(0.20, 0.55, t) - 0.45);
  float insetSuperRadius = superellipticRadius(insetCoord / insetHalfBoundary, insetCornerShape);
  float insetSignedDist = (insetSuperRadius - 1.0) * insetHalfBoundary + uniformEdgeWarp * 0.4 + calculateEdgeWarp(arcLength, 151.0) * reliefMagnitude * 0.7;

  float bevelChannel = smoothEase(-uUnit * 0.008, uUnit * 0.025, insetSignedDist) * plateMask;
  float backFaceMask = bevelChannel * lowerRightFill * glassPresence * (1.0 - settleProg);
  vec3 transmittedBackFace = vec3(0.0);
  float logoReflectedLuma = 0.0;

  if (backFaceMask * uRelief > 0.002) {
    vec2 backNormalDir = normalize(mix(superellipticNormal(insetCoord / insetHalfBoundary, insetCornerShape), radialDir, 0.6));
    float backBevelSlope = smoothEase(0.90, 1.10, insetSuperRadius) * 1.55 * glassPresence * uDropStrength;
    vec2 inwardDir = -normalize(insetCoord + vec2(0.001));
    vec3 backRayVector = refract(vec3(0.0, 0.0, -1.0), normalize(vec3(backNormalDir * backBevelSlope, 1.0)), 1.0 / 1.38);
    vec2 rayLanding = insetCoord + backRayVector.xy / max(-backRayVector.z, 0.25) * uUnit * uDepth * 0.80 * activeScale;

    float searchReach = 0.0;
    for (int stepIdx = 0; stepIdx < 20; stepIdx++) {
      searchReach = float(stepIdx) * uUnit * activeScale * 0.03;
      if (sampleArtworkLOD(uLogo, rayLanding + inwardDir * searchReach, uLogoBox * uArtScale).a > 0.2) break;
    }
    vec4 secondaryRefracted = computeRefractedArtwork(insetCoord + inwardDir * searchReach, backNormalDir * backBevelSlope, activeScale, glassPresence, 1.6, signedDist);
    transmittedBackFace = secondaryRefracted.rgb * vec3(0.03, 0.65, 1.0) * backFaceMask * 0.48 * uRelief * (1.0 - 0.70 * smoothEase(0.75, 1.12, t));
    logoReflectedLuma = smoothEase(0.05, 0.6, secondaryRefracted.a);
  }
  lowerRightFill *= logoReflectedLuma;

  float innerWallRim = centerDecayProg * gaussianBell(insetSignedDist, uUnit * 0.0028 + aaWidth * 0.25);
  float innerWallShadow = centerDecayProg * gaussianBell(insetSignedDist + uUnit * 0.008, uUnit * 0.005);

  vec2 surfacePores = vec2(0.0);
  if (fullyDeveloped * cornerExposure > 0.001) {
    surfacePores = computeGlassMicroPores(arcLength, (rimSDF + uUnit * 0.003) / activeScale, 313.0);
    surfacePores += computeGlassMicroPores(arcLength, insetSignedDist / activeScale, 617.0) * 0.6 * centerDecayProg;
    surfacePores += computeGlassMicroPores(arcLength, (innerSecondarySDF + uUnit * 0.027) / activeScale, 919.0) * 0.8 * centerDecayProg;
    surfacePores *= fullyDeveloped * cornerExposure;
  }

  float angularCoord = atan(pos.y, pos.x);
  float upperSliver = 0.12 + 1.15 * gaussianBell(angularCoord - 2.18, 0.32);
  float lowerSliver = 0.12 + 1.10 * gaussianBell(angularCoord + 0.85, 0.30);

  float tlOffset = angularCoord - 0.75 * PI;
  float brOffset = angularCoord + 0.25 * PI;
  float tlReach = tlOffset < 0.0 ? 0.65 : 0.42;
  float brReach = brOffset < 0.0 ? 0.65 : 0.42;
  float cornerWallFocus = max(
    1.0 - smoothEase(0.6 * tlReach, tlReach, abs(tlOffset)),
    1.0 - smoothEase(0.6 * brReach, brReach, abs(brOffset))
  );

  vec3 insetLight = vec3(0.60, 0.78, 0.91) * innerWallRim * (keyLightIntensity * keyLightIntensity * 0.8 * upperSliver + lowerRightFill * lowerRightFill * 0.75 * lowerSliver + 0.005 + 0.35 * cornerWallFocus * uInnerWallFocus);

  float filamentDrift = 0.7 + 0.6 * edgeContourNoise(arcLength / (uUnit * 0.09) + 7.0);
  float causticFilaments = (gaussianBell(innerSDF + uUnit * 0.021, uUnit * 0.0035 * wallThickness) * 0.9 + gaussianBell(innerSecondarySDF + uUnit * 0.028, uUnit * 0.004 / wallThickness) * 0.7) * centerDecayProg + gaussianBell(rimSDF + uUnit * 0.035, uUnit * 0.003 * wallThickness) * 0.5;

  vec3 lowerCausticRelief = (
    vec3(0.03, 0.32, 1.0) * gaussianBell(signedDist + uUnit * 0.038, uUnit * 0.022 + aaWidth * 0.2) * 0.55 +
    vec3(0.22, 0.62, 1.0) * gaussianBell(signedDist + uUnit * 0.027, uUnit * 0.012 + aaWidth * 0.1) * 0.7 +
    vec3(0.75, 0.97, 1.0) * causticFilaments * 1.35
  ) * filamentDrift * lowerRightFill * glassPresence * uHighlights * uRelief * (1.0 - 0.85 * smoothEase(0.6, 1.0, t)) * (1.0 - settleProg);

  lowerCausticRelief *= 1.0 - surfacePores.x * 0.22;
  lowerCausticRelief += vec3(0.45, 0.85, 1.0) * surfacePores.y * 0.10 * lowerRightFill * glassPresence * uHighlights * uRelief * (1.0 - settleProg);

  float wallLitFactor = clamp(keyLightIntensity * keyLightIntensity * 0.8 * upperSliver + lowerRightFill * lowerRightFill * 0.75 * lowerSliver, 0.0, 1.0);
  float wallGateFactor = mix(1.0, max(smoothEase(0.2, 0.7, wallLitFactor), cornerWallFocus), uPageLight * uInnerWallFocus);

  compositeRGB *= 1.0 - innerWallShadow * wallGateFactor * uRelief * 0.12 * (1.0 - refractedColor.a);
  compositeRGB += transmittedBackFace + lowerCausticRelief + insetLight * wallGateFactor * glassPresence * uHighlights * uRelief * (1.0 - refractedColor.a) * mix(rimVisibilityFactor, 0.9, keyLightIntensity);
  compositeAlpha = max(compositeAlpha, max(lowerCausticRelief.r, max(lowerCausticRelief.g, lowerCausticRelief.b)));

  float specularRimGlint = rimCrest * (0.07 + keyLightIntensity * 0.55) + innerCrest * (0.025 + keyLightIntensity * 0.16) + innerSecondaryCrest * 0.025;
  float microBubbleSize = max(uUnit * 0.0042, 0.8 / uDpr);
  float dynamicBubbles = generateDriftingSpecks(arcLength, rimContourSDF + uUnit * 0.002, microBubbleSize, 0.0, t) * 0.9;
  dynamicBubbles += generateSpecks(arcLength, innerSDF + uUnit * 0.012, microBubbleSize * 0.8, 97.0) * 0.6 * centerDecayProg;
  dynamicBubbles += generateSpecks(arcLength, insetSignedDist, microBubbleSize * 0.9, 191.0) * 0.5 * centerDecayProg;

  specularRimGlint += dynamicBubbles * (0.04 + keyLightIntensity * 0.5 + lowerRightFill * 0.45);
  specularRimGlint = specularRimGlint * (1.0 - surfacePores.x * 0.35) + surfacePores.y * (keyLightIntensity * 0.16 + lowerRightFill * 0.12);

  vec3 dispersiveRimSpec = vec3(0.0);
  vec3 dispersiveWeights = vec3(0.0);
  for (int band = 0; band < NUM_SPECTRAL_BANDS; band++) {
    float spectralProg = float(band) / float(NUM_SPECTRAL_BANDS - 1);
    vec3 bandColor = evaluateSpectrum(spectralProg);
    dispersiveRimSpec += bandColor * gaussianBell(rimSDF + (spectralProg - 0.5) * uUnit * 0.011 * uDispersion + uUnit * 0.003, uUnit * 0.002 * wallThickness);
    dispersiveWeights += bandColor;
  }
  dispersiveRimSpec /= dispersiveWeights;

  vec3 rimReflections = (vec3(0.6, 0.76, 0.9) * specularRimGlint * 1.15 + dispersiveRimSpec * (0.02 + refractedColor.a * 0.32)) * uHighlights * glassPresence * mix(rimVisibilityFactor, 1.2, keyLightIntensity);
  float sphericalRimHighlight = (
    gaussianBell(signedDist + uUnit * activeScale * 0.008, uUnit * activeScale * 0.009) * 0.60 +
    gaussianBell(insetSignedDist, uUnit * activeScale * 0.008) * 0.40
  ) * (0.25 + 0.75 * abs(normalOutward.y)) * (1.0 - smoothEase(0.235, 0.34, t));
  rimReflections += vec3(0.65, 0.80, 0.90) * sphericalRimHighlight * 1.4 * uHighlights * glassPresence;

  float cyanSpecular = pow(max(0.0, -normalOutward.x), 8.0) * (1.0 - smoothEase(0.235, 0.34, t));
  float cyanLipHighlight = gaussianBell(signedDist + uUnit * activeScale * 0.020, uUnit * activeScale * 0.009);
  cyanLipHighlight += gaussianBell(insetSignedDist, uUnit * activeScale * 0.005) * 0.35;
  rimReflections += vec3(0.015, 0.68, 1.0) * cyanLipHighlight * cyanSpecular * glassPresence * uHighlights * 0.85;

  float earlyYouth = 1.0 - smoothEase(0.25, 0.37, t);
  rimReflections += vec3(0.78, 0.84, 0.9) * earlyYouth * 0.07 * (0.5 + 0.5 * superNormRadius) * (1.0 - refractedColor.a) * glassPresence;

  vec3 thinFilmColor = mix(vec3(0.32, 0.0, 0.20), vec3(0.32, 0.08, 0.02), smoothEase(0.75, 1.12, t)) * gaussianBell(signedDist + uUnit * 0.001, uUnit * 0.002) * refractedColor.a * glassPresence * uHighlights;
  compositeRGB += rimReflections + thinFilmColor;
  compositeAlpha = max(compositeAlpha, max(rimReflections.r, max(rimReflections.g, rimReflections.b)));

  vec4 finalPlateResult = vec4(compositeRGB * plateMask, compositeAlpha * plateMask);

  // Exterior echo wave & reflections
  float exteriorEcho = gaussianBell(rimSDF - uUnit * 0.012, uUnit * 0.0028 * wallThickness) * (0.04 + keyLightIntensity * 0.2) * (0.5 + edgeContourNoise(arcLength / grainScale + 131.0));
  exteriorEcho += generateSpecks(arcLength, rimSDF - uUnit * 0.012, microBubbleSize, 277.0) * (0.03 + keyLightIntensity * 0.3 + lowerRightFill * 0.25);

  float waveAgeProgress = smoothEase(0.36, 1.1, t);
  float solitaryWave = gaussianBell(signedDist - uUnit * (0.014 + 0.03 * waveAgeProgress), uUnit * 0.004 + aaWidth * 0.3) * 0.05 * smoothEase(0.34, 0.42, t) * (1.0 - waveAgeProgress);

  vec3 echoColorVector = mix(vec3(0.43, 0.62, 0.79), uTile + (1.0 - uTile) * 0.4, 0.5 * uEchoTint);
  float echoStrength = mix(1.0, mix(0.6, 1.0, uPageLight), uEchoTint);
  float lateralWaveSuppression = mix(1.0, 0.10, smoothEase(0.25, 0.80, abs(normalOutward.x)));

  vec3 ghostEcho = (echoColorVector + refractedColor.rgb * 0.6) * (exteriorEcho + solitaryWave * lateralWaveSuppression) * glassPresence * uHighlights * rimVisibilityFactor * echoStrength;
  float exteriorLuma = max(ghostEcho.r, max(ghostEcho.g, ghostEcho.b)) * 1.8;
  finalPlateResult.rgb += calculateExteriorReflection(ghostEcho * 1.8, exteriorLuma);
  finalPlateResult.a = max(finalPlateResult.a, exteriorLuma);

  return mix(finalPlateResult * visibilityFade, restingArtwork, settleProg);
}

// Wordmark second fluid drop simulation stage
vec4 evaluateWordmarkFluid(vec2 pos) {
  float t = uTime;
  if (uWordmarkEnabled < 0.5) return vec4(0.0);
  if (t < 1.46) return vec4(0.0);
  if (t >= 3.3) return sampleArtworkLOD(uText, pos, uTextBox);

  float dropRadius = max(uDrop.x, 1.0);
  float distToCenter = length(pos);
  if (distToCenter > dropRadius + uUnit * 0.6) return vec4(0.0);

  vec2 normalOutward = pos / max(distToCenter, 0.001);
  float normalizedRadius = distToCenter / dropRadius;
  float aaWidth = 1.0 / uDpr;
  float edgeDist = dropRadius - distToCenter;
  float dropletMask = smoothEase(-aaWidth, aaWidth, edgeDist);
  float youngStage = 1.0 - smoothEase(1.72, 2.02, t);

  float coreRadius = min(uDrop.y, dropRadius);
  float coreNormalizedRadius = distToCenter / max(coreRadius, 1.0);
  float rimLandingOffset = coreRadius / max(uDropLens.x, 0.01);
  float centerExponent = uDrop.w;
  float landingCoord = distToCenter < coreRadius
    ? rimLandingOffset * coreNormalizedRadius * (centerExponent + (1.0 - centerExponent) * pow(coreNormalizedRadius, uDropLens.y))
    : rimLandingOffset + (distToCenter - coreRadius) * uDrop.z;

  float rimTransitionZone = smoothEase(coreRadius * 0.9, coreRadius, distToCenter);
  float waveFrequency = 2.0 * PI / max(uDropLens.w, 1.0);
  landingCoord += uDropLens.z * sin(waveFrequency * distToCenter - uDropWave.x) * smoothEase(0.0, uDropLens.w, distToCenter) * mix(uDropWave.y, 1.0, rimTransitionZone);

  vec2 lateralDeflection = normalOutward * (landingCoord - distToCenter);
  float chromaticSpread = uDropWave.z * uDispersion * (0.15 + 0.85 * rimTransitionZone);

  vec3 accumulatedRGB = vec3(0.0);
  vec3 accumulatedSpectralWeights = vec3(0.0);
  float accumulatedAlpha = 0.0;
  float dropletOpacity = smoothEase(1.46, 1.49, t);

  for (int band = 0; band < NUM_SPECTRAL_BANDS; band++) {
    float spectralProg = float(band) / float(NUM_SPECTRAL_BANDS - 1);
    vec2 deflectedCoord = pos + lateralDeflection * (1.0 + chromaticSpread * (spectralProg - 0.5));
    vec4 sampledInk = sampleArtworkLOD(uText, deflectedCoord, uTextBox);
    vec3 bandColor = evaluateSpectrum(spectralProg);
    accumulatedRGB += sampledInk.rgb * bandColor;
    accumulatedAlpha += sampledInk.a * (bandColor.r + bandColor.g + bandColor.b);
    accumulatedSpectralWeights += bandColor;
  }

  accumulatedRGB /= accumulatedSpectralWeights;
  accumulatedAlpha /= (accumulatedSpectralWeights.r + accumulatedSpectralWeights.g + accumulatedSpectralWeights.b);

  accumulatedRGB *= 1.0 + uCaustics * gaussianBell(edgeDist, uUnit * 0.06) * 0.15;
  accumulatedRGB *= dropletMask;
  accumulatedAlpha *= dropletMask;

  float freshnessFactor = 1.0 - smoothEase(1.62, 1.95, t);
  accumulatedRGB = min(accumulatedRGB * (1.0 + 0.6 * freshnessFactor), vec3(1.0));
  float internalMilkyScattering = dropletMask * freshnessFactor * 0.30 * (0.6 + 0.4 * normalizedRadius) * uCaustics;
  accumulatedRGB += vec3(0.75, 0.82, 0.9) * internalMilkyScattering * (1.0 - accumulatedAlpha);

  float perimeterSpill = exp(-max(distToCenter - dropRadius, 0.0) / (uUnit * 0.17)) * (1.0 - dropletMask) * freshnessFactor * 0.12;
  perimeterSpill += exp(-max(distToCenter - dropRadius, 0.0) / (uUnit * 0.4)) * (1.0 - freshnessFactor) * 0.035 * exp(-max(t - 1.95, 0.0) / 0.45) * (1.0 - smoothEase(2.8, 3.1, t));
  accumulatedRGB += vec3(0.32, 0.6, 1.0) * perimeterSpill;
  accumulatedAlpha = max(accumulatedAlpha, max(internalMilkyScattering, perimeterSpill));

  vec3 dropletSphereNorm = normalize(vec3(pos / dropRadius, sqrt(max(0.005, 1.0 - normalizedRadius * normalizedRadius))));
  vec3 dropletReflectedRay = reflect(vec3(0.0, 0.0, -1.0), dropletSphereNorm);
  float softboxSpecular = gaussianBell(dropletReflectedRay.x + 0.3, 0.2) * gaussianBell(dropletReflectedRay.y - 0.55, 0.15);
  float pinpointSpecular = gaussianBell(dropletReflectedRay.x - 0.25, 0.14) * gaussianBell(dropletReflectedRay.y - 0.65, 0.08);
  float broadSpecular = gaussianBell(dropletReflectedRay.x + 0.35, 0.65) * gaussianBell(dropletReflectedRay.y - 0.6, 0.45);

  float surfaceHighlights = (softboxSpecular * 0.8 + pinpointSpecular * 0.6 + broadSpecular * 0.22) * youngStage * uHighlights * dropletMask;
  accumulatedRGB += vec3(0.85, 0.95, 1.0) * surfaceHighlights;
  accumulatedAlpha = max(accumulatedAlpha, surfaceHighlights);

  float directionalKey = pow(0.5 + 0.5 * dot(normalOutward, normalize(vec2(-0.6, 0.8))), 7.0);
  float concentricRipples = 0.0;
  for (int ringIdx = 0; ringIdx < 4; ringIdx++) {
    float j = float(ringIdx);
    float currentRingRadius = dropRadius + (j - 1.0) * uUnit * 0.022 * (1.0 + 0.55 * smoothEase(1.8, 3.1, t));
    concentricRipples += gaussianBell(distToCenter - currentRingRadius, uUnit * (0.003 + j * 0.001)) * (0.11 / (1.0 + j));
  }

  float waveAge = max(0.0, t - 1.46);
  float waveAttenuation = exp(-waveAge / max(uDecay, 0.1)) * (1.0 - smoothEase(2.65, 3.3, t));
  float lateralRays = pow(abs(normalOutward.x), 10.0) * mix(1.0, 0.72, step(0.0, pos.x));

  vec3 rippleSpecular = vec3(0.4, 0.62, 0.79) * concentricRipples * (0.3 + directionalKey * 2.0 + lateralRays * 1.8) * waveAttenuation * uHighlights;
  accumulatedRGB += rippleSpecular;
  accumulatedAlpha = max(accumulatedAlpha, max(rippleSpecular.r, max(rippleSpecular.g, rippleSpecular.b)));

  return vec4(accumulatedRGB, accumulatedAlpha) * dropletOpacity;
}

void main() {
  vec2 screenCoords = (gl_FragCoord.xy - uResolution * 0.5) / uDpr;
  vec4 iconOutput = evaluateIconPlate(screenCoords);
  vec4 wordmarkOutput = evaluateWordmarkFluid(screenCoords);

  vec4 finalComposite = wordmarkOutput + iconOutput * (1.0 - wordmarkOutput.a);
  finalComposite.a = clamp(max(finalComposite.a, max(finalComposite.r, max(finalComposite.g, finalComposite.b))), 0.0, 1.0);

  // High-frequency subtle spatial dither to eliminate color banding in smooth gradients
  float ditherNoise = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
  outColor = vec4(clamp(finalComposite.rgb + ditherNoise * finalComposite.a, vec3(0.0), vec3(finalComposite.a)), finalComposite.a);
}
`;

/** Secondary fragment shader performing multi-scale optical bloom & filmic diffusion */
export const liquidGlassLogoComposite = `#version 300 es
precision highp float;

uniform sampler2D uScene;
uniform vec2 uResolution;
uniform float uDpr;
uniform float uUnit;
uniform float uSettle;
uniform float uBloom;
uniform float uTime;
uniform float uFinish;
uniform float uPageLight;

out vec4 outColor;

// Multi-tap Gaussian-weighted optical sample kernel
vec4 filterOpticalSoftness(vec2 uvCoord, float lodLevel) {
  vec2 texelStep = vec2(uDpr * 0.90) / uResolution;
  vec4 filteredColor = textureLod(uScene, uvCoord, lodLevel) * 0.25;
  filteredColor += textureLod(uScene, uvCoord + vec2(texelStep.x, 0.0), lodLevel) * 0.125;
  filteredColor += textureLod(uScene, uvCoord - vec2(texelStep.x, 0.0), lodLevel) * 0.125;
  filteredColor += textureLod(uScene, uvCoord + vec2(0.0, texelStep.y), lodLevel) * 0.125;
  filteredColor += textureLod(uScene, uvCoord - vec2(0.0, texelStep.y), lodLevel) * 0.125;
  filteredColor += textureLod(uScene, uvCoord + texelStep, lodLevel) * 0.0625;
  filteredColor += textureLod(uScene, uvCoord - texelStep, lodLevel) * 0.0625;
  filteredColor += textureLod(uScene, uvCoord + vec2(texelStep.x, -texelStep.y), lodLevel) * 0.0625;
  filteredColor += textureLod(uScene, uvCoord + vec2(-texelStep.x, texelStep.y), lodLevel) * 0.0625;
  return filteredColor;
}

void main() {
  vec2 uvCoord = gl_FragCoord.xy / uResolution;
  vec4 baseSample = textureLod(uScene, uvCoord, 0.0);
  float dprLodOffset = log2(max(uDpr, 0.5));

  float wavePhase = smoothstep(0.29, 0.41, uTime) * (1.0 - smoothstep(1.25, 1.50, uTime));
  float waveMask = 0.0;

  if (wavePhase > 0.001) {
    float enter = smoothstep(0.025, 0.16, uTime);
    float expand = enter * (0.64 + 0.41 * (1.0 - exp(-max(uTime - 0.16, 0.0) * 5.8)));
    float collapse = 1.0 - smoothstep(1.33, 1.52, uTime);
    float lensScale = mix(expand * mix(0.48, 1.0, collapse), 1.0, smoothstep(0.0, 1.0, uSettle));
    float halfSize = max(0.001, uUnit * lensScale * 0.5);
    float shape = 2.0 + 3.0 * smoothstep(0.29, 0.36, uTime);
    vec2 p = abs((gl_FragCoord.xy - uResolution * 0.5) / uDpr) / halfSize;
    float radius = pow(pow(p.x, shape) + pow(p.y, shape), 1.0 / shape);
    float distance = (radius - 1.0) * halfSize;
    waveMask = smoothstep(0.0, max(0.75, uUnit * 0.004), distance) * wavePhase;
    if (waveMask > 0.001) {
      baseSample = mix(baseSample, filterOpticalSoftness(uvCoord, max(0.0, dprLodOffset + 0.15)), waveMask * 0.94);
    }
  }

  // Multi-tier Mip-Chain Pyramid for wide dispersion bloom
  vec3 diffuseGlow = textureLod(uScene, uvCoord, dprLodOffset + 2.5).rgb * 0.50;
  diffuseGlow += textureLod(uScene, uvCoord, dprLodOffset + 4.1).rgb * 0.32;
  diffuseGlow += textureLod(uScene, uvCoord, dprLodOffset + 5.4).rgb * 0.18;

  float peakLuma = max(baseSample.r, max(baseSample.g, baseSample.b));
  float sequenceFinishMask = 1.0 - smoothstep(0.0, 1.0, uFinish);
  vec3 opticalBloom = diffuseGlow * uBloom * 0.20 * (1.0 - min(1.0, peakLuma * 1.2)) * sequenceFinishMask * (1.0 - uPageLight);
  float compositeAlpha = clamp(max(baseSample.a, max(opticalBloom.r, max(opticalBloom.g, opticalBloom.b))), 0.0, 1.0);

  // Cinematic temporal grain
  float temporalGrain = fract(sin(dot(gl_FragCoord.xy + floor(uTime * 24.0), vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  vec3 compositeColor = baseSample.rgb + opticalBloom + temporalGrain * 0.009 * baseSample.a * clamp(peakLuma * 3.0 + 0.05, 0.05, 1.0) * sequenceFinishMask * (1.0 - waveMask * 0.85);

  outColor = vec4(clamp(compositeColor, vec3(0.0), vec3(compositeAlpha)), compositeAlpha);
}
`;
