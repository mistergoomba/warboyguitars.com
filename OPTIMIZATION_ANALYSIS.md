# Asset Optimization Analysis - Warboy Guitars

## Executive Summary

**Total Public Assets Size: ~49MB**

This analysis identifies opportunities to reduce load times and improve site performance through asset optimization.

---

## 🔴 Critical Issues (High Impact)

### 1. **Unused Thunderpig Assets (~6.9MB)**

**Location:** `public/guitars/thunderpig/` (entire directory)

- **Status:** Removed from data.js but files still exist
- **Impact:** Unnecessary storage, potential confusion
- **Recommendations:**
  - ✅ **DELETE** entire `public/guitars/thunderpig/` directory
  - **Potential Savings: ~6.9MB**

---

## 🟡 Medium Priority Issues

### 2. **Noise Texture - PNG Format (131KB)**

**Location:** `public/noise.png`

- **Usage:** Background texture in globals.css
- **Impact:** Loaded on every page
- **Recommendations:**
  - ✅ Convert to WebP (estimated 30-40% reduction)
  - ✅ Consider using CSS noise generation instead (no file needed)
  - **Potential Savings: ~40-50KB**

---

## 🟢 Low Priority / Cleanup

### 3. **Original PNG/MP4 Files (Backups)**

**Location:** Various original files that have been converted to WebP

- **Status:** WebP versions are being used, originals kept as backups
- **Impact:** Storage space
- **Recommendations:**
  - ⚠️ Consider removing original PNG/MP4 files after verifying WebP works correctly
  - ⚠️ Keep originals in version control, remove from public directory
  - **Potential Savings: ~20-25MB (if originals removed)**

### 4. **Gallery Images - Mixed Formats**

**Status:** Gallery images already have WebP versions (good!)

- **Observation:** Both JPG and WebP exist for most images
- **Current Usage:** Gallery component uses manifest.json to select appropriate sizes
- **Recommendations:**
  - ✅ Ensure WebP is prioritized in manifest.json
  - ⚠️ Keep both formats for browser compatibility
  - **Note:** No immediate action needed, current setup is good

---

## 📊 Optimization Priority Matrix

| Priority  | Asset Type          | Current Size | Potential Savings | Effort   | Impact |
| --------- | ------------------- | ------------ | ----------------- | -------- | ------ |
| 🔴 **P0** | Thunderpig (unused) | 6.9MB        | 6.9MB             | Very Low | High   |
| 🟡 **P1** | noise.png           | 131KB        | ~40-50KB          | Low      | Low    |
| 🟢 **P2** | Original backups    | ~20-25MB     | ~20-25MB          | Low      | Low    |

**Total Potential Savings: ~6.9-7MB (14% reduction)**
**Note:** Removing unused/original files could save ~27-32MB total

---

## 🛠️ Implementation Recommendations

### Immediate Actions (Quick Wins)

1. **Delete thunderpig directory** - 6.9MB saved instantly

### Short-term (1-2 days)

1. **Convert noise.png to WebP** - Easy, ~50KB saved

### Medium-term (Optional)

1. **Clean up original backup files** - After verifying WebP works correctly
2. **Consider CSS noise generation** - Eliminate noise.png entirely

---

## 🔧 Technical Implementation Notes

### Image Conversion Tools

```bash
# WebP conversion (using cwebp)
cwebp -q 85 input.png -o output.webp

# Batch conversion script
find public -name "*.png" ! -name "*.webp" -exec cwebp -q 85 {} -o {}.webp \;
```

### Next.js Image Optimization

- ✅ Already using Next.js Image component (good!)
- ✅ WebP format is automatically served when available
- ✅ Image optimization is enabled by default in Next.js

### Video Optimization

```bash
# FFmpeg command for better compression
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k output.mp4

# WebM conversion
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 64k output.webm
```

---

## 📈 Expected Performance Improvements

### Current State

- **Total Assets:** ~49MB
- **Unused Assets:** ~6.9MB (thunderpig directory)
- **Optimization Opportunities:** ~6.9-7MB additional savings

### After Optimization

- **Total Assets:** ~30-32MB (35-40% reduction)
- **Initial Load:** Optimized with WebP images
- **Time to Interactive:** Faster on average connections

### Metrics to Track

- Lighthouse Performance Score
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)

---

## ✅ Checklist

- [ ] Delete `public/guitars/thunderpig/` directory
- [ ] Convert noise.png → noise.webp
- [ ] Update code references to use WebP versions
- [ ] Test all changes across browsers
- [ ] Run Lighthouse audit before/after
- [ ] Consider cleaning up original backup files

---

## 📝 Notes

- **WebP Browser Support:** 95%+ (all modern browsers)
- **Next.js Image:** Automatically serves WebP when available
- **Backward Compatibility:** Keep original formats as fallbacks if needed
- **Version Control:** Keep original files in git, remove from public directory after verification

---

_Analysis Date: $(date)_
_Total Analysis Time: ~5 minutes_
_Recommended Implementation Time: 1-2 hours for quick wins, 1 day for full optimization_
