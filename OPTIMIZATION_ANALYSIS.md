# Asset Optimization Analysis - Warboy Guitars

## Executive Summary
**Total Public Assets Size: ~45MB**

This analysis identifies opportunities to reduce load times and improve site performance through asset optimization.

---

## 🔴 Critical Issues (High Impact)

### 1. **Hero Full Images - PNG Format (16MB+ total)**
**Location:** `public/guitars/*/hero-full.png`
- **Current Size:** 4.0-4.4MB each (4 guitars = ~16MB)
- **Dimensions:** 3200x4800px PNG (RGBA)
- **Usage:** Loaded on-demand in zoom overlay
- **Impact:** These are the largest single files on the site

**Recommendations:**
- ✅ Convert to WebP format (estimated 70-80% reduction = ~3-4MB savings per image)
- ✅ Consider AVIF format for modern browsers (even better compression)
- ✅ Create multiple sizes if needed (though zoom overlay may need full res)
- **Potential Savings: ~12-13MB**

### 2. **Video Files (3.5MB total)**
**Location:** `public/main-ad-bg.mp4` (1.4MB), `public/main-ad.mp4` (2.1MB)
- **Usage:** Background video in Hero component (autoplay, loop, muted)
- **Impact:** Loaded immediately on homepage

**Recommendations:**
- ✅ Re-encode with better compression (H.264 with lower bitrate)
- ✅ Consider WebM format as primary with MP4 fallback
- ✅ Add `preload="metadata"` or `preload="none"` to defer loading
- ✅ Consider using poster image instead of video for mobile
- ✅ Lazy load video (only start when in viewport)
- **Potential Savings: ~1-1.5MB**

### 3. **Background Images - bg.jpg (1.3MB total)**
**Location:** `public/guitars/*/bg.jpg` (4 files, 327-368KB each)
- **Usage:** Full-screen backgrounds in GuitarList component (100dvh each)
- **Impact:** Loaded for each guitar row

**Recommendations:**
- ✅ Optimize JPEG compression (reduce quality to 80-85%)
- ✅ Convert to WebP format (better compression for photos)
- ✅ Consider using Next.js Image component with blur placeholder
- ✅ Implement lazy loading (only load when row is near viewport)
- **Potential Savings: ~400-500KB**

---

## 🟡 Medium Priority Issues

### 4. **Thumbnail Images - PNG Format (500KB total)**
**Location:** `public/guitars/*/thumb.png` (4 files, 124-140KB each)
- **Usage:** Displayed in GuitarList component (70dvh height)
- **Impact:** Loaded on homepage

**Recommendations:**
- ✅ Convert to WebP format (estimated 30-40% reduction)
- ✅ Optimize PNG compression if keeping PNG
- ✅ Ensure Next.js Image optimization is working
- **Potential Savings: ~150-200KB**

### 5. **Main Ad Assets (2.7MB total)**
**Location:** 
- `public/main-ad-bg.png` (2.4MB) - Fallback for video
- `public/main-ad-guitar.png` (298KB) - Overlay image

**Recommendations:**
- ✅ Convert main-ad-bg.png to WebP (huge savings)
- ✅ Optimize main-ad-guitar.png or convert to WebP
- ✅ Consider if main-ad-bg.png is actually needed (video should handle this)
- **Potential Savings: ~1.5-2MB**

### 6. **Logo Files (400KB+ total)**
**Location:** `public/logo*.png` files
- **Current:** logo-big.png (183KB), logo.png (243KB), logo-horiz.png (59KB)
- **Usage:** Various components

**Recommendations:**
- ✅ Convert to WebP or SVG (logos are good candidates for SVG)
- ✅ Optimize PNG compression
- **Potential Savings: ~200-300KB**

---

## 🟢 Low Priority / Cleanup

### 7. **Unused Thunderpig Assets (~3MB)**
**Location:** `public/guitars/thunderpig/` (entire directory)
- **Status:** Removed from data.js but files still exist
- **Impact:** Unnecessary storage, potential confusion

**Recommendations:**
- ✅ **DELETE** entire `public/guitars/thunderpig/` directory
- **Potential Savings: ~3MB**

### 8. **Gallery Images - Mixed Formats**
**Status:** Gallery images already have WebP versions (good!)
- **Observation:** Both JPG and WebP exist for most images
- **Current Usage:** Gallery component uses manifest.json to select appropriate sizes

**Recommendations:**
- ✅ Ensure WebP is prioritized in manifest.json
- ✅ Consider removing unused JPG versions if WebP is always preferred
- ⚠️ Keep both formats for browser compatibility

### 9. **Noise Texture (131KB)**
**Location:** `public/noise.png`
- **Usage:** Background texture in globals.css
- **Recommendations:**
- ✅ Convert to WebP
- ✅ Consider using CSS noise generation instead
- **Potential Savings: ~50-70KB**

---

## 📊 Optimization Priority Matrix

| Priority | Asset Type | Current Size | Potential Savings | Effort | Impact |
|----------|-----------|--------------|-------------------|--------|--------|
| 🔴 **P0** | hero-full.png (4 files) | 16MB | ~12-13MB | Medium | Very High |
| 🔴 **P0** | Videos (2 files) | 3.5MB | ~1-1.5MB | Medium | High |
| 🔴 **P0** | bg.jpg (4 files) | 1.3MB | ~400-500KB | Low | Medium |
| 🟡 **P1** | thumb.png (4 files) | 500KB | ~150-200KB | Low | Medium |
| 🟡 **P1** | main-ad assets | 2.7MB | ~1.5-2MB | Low | Medium |
| 🟡 **P1** | Logo files | 400KB | ~200-300KB | Low | Low |
| 🟢 **P2** | Thunderpig (unused) | 3MB | 3MB | Very Low | Low |
| 🟢 **P2** | noise.png | 131KB | ~50-70KB | Very Low | Low |

**Total Potential Savings: ~19-21MB (42-47% reduction)**

---

## 🛠️ Implementation Recommendations

### Immediate Actions (Quick Wins)
1. **Delete thunderpig directory** - 3MB saved instantly
2. **Convert thumbnails to WebP** - Easy, ~200KB saved
3. **Optimize bg.jpg files** - Re-compress with better settings

### Short-term (1-2 days)
1. **Convert hero-full.png to WebP** - Biggest impact
2. **Optimize video files** - Re-encode with better compression
3. **Convert logo files to WebP/SVG**

### Medium-term (1 week)
1. **Implement lazy loading for bg.jpg** in GuitarList
2. **Add video preload optimization** in Hero component
3. **Audit and optimize all remaining PNG files**

---

## 🔧 Technical Implementation Notes

### Image Conversion Tools
```bash
# WebP conversion (using cwebp)
cwebp -q 85 input.png -o output.webp

# JPEG optimization
jpegoptim --max=85 --strip-all input.jpg

# Batch conversion script
find public/guitars -name "*.png" -exec cwebp -q 85 {} -o {}.webp \;
```

### Next.js Image Optimization
- ✅ Already using Next.js Image component (good!)
- ⚠️ Ensure `next.config.mjs` has image optimization enabled
- ⚠️ Consider adding `unoptimized: false` explicitly if needed

### Video Optimization
```bash
# FFmpeg command for better compression
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k output.mp4
```

### Lazy Loading Implementation
- Use `loading="lazy"` for images below the fold
- Consider Intersection Observer for bg.jpg in GuitarList
- Video: Use `preload="metadata"` or `preload="none"`

---

## 📈 Expected Performance Improvements

### Before Optimization
- **Total Assets:** ~45MB
- **Initial Load:** ~8-10MB (Hero video + images)
- **Time to Interactive:** Slower on slower connections

### After Optimization
- **Total Assets:** ~24-26MB (42-47% reduction)
- **Initial Load:** ~4-5MB (optimized video + WebP images)
- **Time to Interactive:** 40-50% faster on average connections

### Metrics to Track
- Lighthouse Performance Score
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)

---

## ✅ Checklist

- [ ] Delete `public/guitars/thunderpig/` directory
- [ ] Convert hero-full.png → hero-full.webp (4 files)
- [ ] Update data.js to use .webp extensions
- [ ] Optimize/re-encode video files
- [ ] Convert thumb.png → thumb.webp (4 files)
- [ ] Optimize bg.jpg files (re-compress)
- [ ] Convert logo files to WebP/SVG
- [ ] Convert main-ad-bg.png to WebP
- [ ] Add lazy loading to bg.jpg in GuitarList
- [ ] Optimize video preload in Hero component
- [ ] Test all changes across browsers
- [ ] Run Lighthouse audit before/after
- [ ] Update any hardcoded image paths

---

## 📝 Notes

- **WebP Browser Support:** 95%+ (all modern browsers)
- **AVIF Support:** 85%+ (consider for future)
- **Next.js Image:** Automatically serves WebP when available
- **Backward Compatibility:** Keep original formats as fallbacks if needed

---

*Generated: $(date)*
*Total Analysis Time: ~5 minutes*
*Recommended Implementation Time: 1-2 days for full optimization*

