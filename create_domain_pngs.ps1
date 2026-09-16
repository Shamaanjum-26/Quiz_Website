Add-Type -AssemblyName System.Drawing

$domainsDir = "c:\Users\SHAMA\OneDrive\Desktop\QUIZ\frontend\public\domains"
if (!(Test-Path $domainsDir)) {
    New-Object -ItemType Directory -Path $domainsDir -Force | Out-Null
}

function Create-RoundedRectanglePath {
    param(
        [float]$x, [float]$y, [float]$w, [float]$h, [float]$r
    )
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $r * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    return $path
}

function Generate-DomainIcon {
    param(
        [string]$fileName,
        [System.Drawing.Color]$color1,
        [System.Drawing.Color]$color2,
        [string]$symbol,
        [string]$label,
        [string]$subLabel
    )

    $size = 128
    $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    # Transparent background
    $g.Clear([System.Drawing.Color]::Transparent)

    # Rounded card rect
    $rectPath = Create-RoundedRectanglePath 4 4 120 120 28
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.PointF(0, 0)),
        (New-Object System.Drawing.PointF(128, 128)),
        $color1,
        $color2
    )
    $g.FillPath($brush, $rectPath)

    # Subtle inner border for glassy depth
    $innerBorderPath = Create-RoundedRectanglePath 4 4 120 120 28
    $borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(60, 255, 255, 255), 2.5)
    $g.DrawPath($borderPen, $innerBorderPath)

    # Soft top-light highlight
    $topHighlightPath = Create-RoundedRectanglePath 8 8 112 50 20
    $topBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.PointF(0, 8)),
        (New-Object System.Drawing.PointF(0, 58)),
        [System.Drawing.Color]::FromArgb(70, 255, 255, 255),
        [System.Drawing.Color]::FromArgb(0, 255, 255, 255)
    )
    $g.FillPath($topBrush, $topHighlightPath)

    # Symbol / Glyph
    $fontFamily = [System.Drawing.FontFamily]::GenericSansSerif
    $fontSymbol = New-Object System.Drawing.Font($fontFamily, 34, [System.Drawing.FontStyle]::Bold)
    $fontLabel = New-Object System.Drawing.Font($fontFamily, 13, [System.Drawing.FontStyle]::Bold)
    $fontSub = New-Object System.Drawing.Font($fontFamily, 8.5, [System.Drawing.FontStyle]::Regular)

    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center

    # Draw Symbol
    $symbolBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $g.DrawString($symbol, $fontSymbol, $symbolBrush, 64, 46, $format)

    # Draw Domain Text Tag
    $labelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(250, 255, 255, 255))
    $g.DrawString($label, $fontLabel, $labelBrush, 64, 88, $format)

    # Draw Subtitle Tag if any
    if ($subLabel) {
        $subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(210, 255, 255, 255))
        $g.DrawString($subLabel, $fontSub, $subBrush, 64, 105, $format)
    }

    $outPath = Join-Path $domainsDir $fileName
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Created: $outPath"
}

# 1. Python
Generate-DomainIcon "python.png" `
    ([System.Drawing.Color]::FromArgb(255, 41, 128, 185)) `
    ([System.Drawing.Color]::FromArgb(255, 243, 156, 18)) `
    "</>" "PYTHON" "DEV"

# 2. Web Development
Generate-DomainIcon "web-dev.png" `
    ([System.Drawing.Color]::FromArgb(255, 16, 185, 129)) `
    ([System.Drawing.Color]::FromArgb(255, 6, 95, 70)) `
    "{WEB}" "FULL STACK" "REACT & NODE"

# 3. Data Science & AI
Generate-DomainIcon "data-science.png" `
    ([System.Drawing.Color]::FromArgb(255, 139, 92, 246)) `
    ([System.Drawing.Color]::FromArgb(255, 76, 29, 149)) `
    "[AI]" "DATA & ML" "ANALYTICS"

# 4. Java & Spring Boot
Generate-DomainIcon "java.png" `
    ([System.Drawing.Color]::FromArgb(255, 249, 115, 22)) `
    ([System.Drawing.Color]::FromArgb(255, 194, 65, 12)) `
    "JAVA" "SPRING BOOT" "ENTERPRISE"

# 5. Cloud & DevOps
Generate-DomainIcon "cloud.png" `
    ([System.Drawing.Color]::FromArgb(255, 14, 165, 233)) `
    ([System.Drawing.Color]::FromArgb(255, 3, 105, 161)) `
    "CLOUD" "DEVOPS" "AWS & DOCKER"

# 6. Cybersecurity
Generate-DomainIcon "cybersecurity.png" `
    ([System.Drawing.Color]::FromArgb(255, 239, 68, 68)) `
    ([System.Drawing.Color]::FromArgb(255, 153, 27, 27)) `
    "[SEC]" "CYBER SEC" "DEFENSE"

# 7. Default
Generate-DomainIcon "default.png" `
    ([System.Drawing.Color]::FromArgb(255, 99, 102, 241)) `
    ([System.Drawing.Color]::FromArgb(255, 67, 56, 202)) `
    "TECH" "ASSESSMENT" "SKILLPROBE"
