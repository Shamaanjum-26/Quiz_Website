Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\SHAMA\.gemini\antigravity-ide\brain\9a993793-972d-4877-9443-ee8831335d25\.user_uploaded\media_1789043914695.jpg"
$destPath = "c:\Users\SHAMA\OneDrive\Desktop\QUIZ\frontend\public\logo.png"
$favPath = "c:\Users\SHAMA\OneDrive\Desktop\QUIZ\frontend\public\favicon.png"

$srcImage = [System.Drawing.Bitmap]::FromFile($srcPath)
$width = $srcImage.Width
$height = $srcImage.Height

# Create a 32-bit ARGB bitmap for true alpha transparency
$transparentImage = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $pixel = $srcImage.GetPixel($x, $y)
        $r = [int]$pixel.R
        $g = [int]$pixel.G
        $b = [int]$pixel.B

        # Calculate brightness / whiteness
        # If R, G, and B are all high (near white), make it transparent
        $minChannel = [Math]::Min($r, [Math]::Min($g, $b))
        
        if ($minChannel -gt 240) {
            # Completely transparent
            $newColor = [System.Drawing.Color]::FromArgb(0, 0, 0, 0)
        } elseif ($minChannel -gt 215) {
            # Smooth edge feathering
            $alpha = [int](255 * (240 - $minChannel) / 25)
            $newColor = [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b)
        } else {
            # Logo pixel - preserve full opacity
            $newColor = [System.Drawing.Color]::FromArgb(255, $r, $g, $b)
        }

        $transparentImage.SetPixel($x, $y, $newColor)
    }
}

$srcImage.Dispose()

# Save as PNG
$transparentImage.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$transparentImage.Save($favPath, [System.Drawing.Imaging.ImageFormat]::Png)
$transparentImage.Dispose()

Write-Host "Transparent logo generated successfully at $destPath"
