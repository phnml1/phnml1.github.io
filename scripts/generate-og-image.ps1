Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$outputPath = Join-Path $projectRoot 'public\og.png'
$width = 1200
$height = 630

$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$background = [System.Drawing.ColorTranslator]::FromHtml('#131313')
$surface = [System.Drawing.ColorTranslator]::FromHtml('#201F1F')
$primary = [System.Drawing.ColorTranslator]::FromHtml('#ADC6FF')
$text = [System.Drawing.ColorTranslator]::FromHtml('#FFFFFF')
$secondary = [System.Drawing.ColorTranslator]::FromHtml('#E5E7EB')
$outline = [System.Drawing.ColorTranslator]::FromHtml('#424754')

$graphics.Clear($background)

$surfaceBrush = New-Object System.Drawing.SolidBrush($surface)
$primaryBrush = New-Object System.Drawing.SolidBrush($primary)
$textBrush = New-Object System.Drawing.SolidBrush($text)
$secondaryBrush = New-Object System.Drawing.SolidBrush($secondary)
$outlinePen = New-Object System.Drawing.Pen($outline, 2)
$primaryPen = New-Object System.Drawing.Pen($primary, 6)

$graphics.FillRectangle($surfaceBrush, 64, 64, 1072, 502)
$graphics.DrawRectangle($outlinePen, 64, 64, 1072, 502)
$graphics.DrawLine($primaryPen, 112, 122, 270, 122)

$labelFont = New-Object System.Drawing.Font('Malgun Gothic', 18, [System.Drawing.FontStyle]::Bold)
$titleFont = New-Object System.Drawing.Font('Malgun Gothic', 58, [System.Drawing.FontStyle]::Bold)
$subtitleFont = New-Object System.Drawing.Font('Malgun Gothic', 28, [System.Drawing.FontStyle]::Regular)
$stackFont = New-Object System.Drawing.Font('Segoe UI', 18, [System.Drawing.FontStyle]::Regular)

$graphics.DrawString('PORTFOLIO', $labelFont, $primaryBrush, 112, 150)
$graphics.DrawString('이주영', $titleFont, $textBrush, 105, 205)
$graphics.DrawString('Frontend Developer', $titleFont, $textBrush, 105, 292)
$graphics.DrawString('업무 화면과 실시간 협업 UI를 만들고,', $subtitleFont, $secondaryBrush, 112, 405)
$graphics.DrawString('렌더링 병목을 측정해 개선합니다.', $subtitleFont, $secondaryBrush, 112, 452)
$graphics.DrawString('React  ·  TypeScript  ·  Next.js', $stackFont, $primaryBrush, 112, 520)

$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$stackFont.Dispose()
$subtitleFont.Dispose()
$titleFont.Dispose()
$labelFont.Dispose()
$primaryPen.Dispose()
$outlinePen.Dispose()
$secondaryBrush.Dispose()
$textBrush.Dispose()
$primaryBrush.Dispose()
$surfaceBrush.Dispose()
$graphics.Dispose()
$bitmap.Dispose()

Write-Output "Generated $outputPath ($width x $height)"
