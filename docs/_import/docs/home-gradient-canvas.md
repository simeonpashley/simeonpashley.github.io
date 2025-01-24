```css
<style>.HomepageHeroGradient{--gradientColorZero:#a960ee;--gradientColorOne:#ff333d;--gradientColorTwo:#90e0ff;--gradientColorThree:#ffcb57;--gradientColorZeroTransparent:rgba(169,96,238,0);--gradientColorOneTransparent:rgba(255,51,61,0);--gradientColorTwoTransparent:rgba(144,224,255,0);--gradientColorThreeTransparent:rgba(255,203,87,0);--gradientAngle:var(--angleStrong);--gradientHeight:calc(100% + var(--sectionPaddingTop) + var(--transformOriginX)*var(--sectionAngleSin));--offsetX:var(--gutterWidth);--transformOriginX:-60px;--sectionAngleSin:var(--angleStrongSin);position:absolute;bottom:0;top:auto;left:calc(var(--offsetX)*-1);width:var(--windowWidth);height:var(--gradientHeight);transform-origin:var(--transformOriginX) 100%;transform:skewY(var(--gradientAngle));overflow:hidden;border:none}@media (min-width:600px){.HomepageHeroGradient{--transformOriginX:calc(var(--gutterWidth)*0.8)}}</style>
```

```html
<div class="HomepageHeroGradient Gradient isLoaded">
  <canvas class="Gradient__canvas isLoaded" data-js-controller="Gradient" data-js-darken-top="" data-transition-in="" width="1950" height="600"></canvas>
</div>
``````html
  <div class='HomepageHeroGradient Gradient'>
  <canvas
    class="Gradient__canvas"
    data-js-controller="Gradient"
    data-js-darken-top
    data-transition-in
  ></canvas>
</div>

```