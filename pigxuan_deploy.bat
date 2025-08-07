@echo off
cd /d %~dp0

echo ===== React Build =====
cmd /c "npm run build"

echo ===== Upload to S3 =====
cmd /c "aws s3 sync dist s3://pigxuan --delete --exact-timestamps --cache-control \"public,max-age=3600\" --metadata-directive REPLACE"

echo ===== Invalidate CloudFront Cache =====
:: 清整個網站 Cache
cmd /c aws cloudfront create-invalidation --distribution-id E1C89881XI6XXA --paths "/*"
:: 針對圖片目錄清 Cache，確保圖片變動立即生效
cmd /c aws cloudfront create-invalidation --distribution-id E1C89881XI6XXA --paths "/img/*"
:: 針對css目錄清 Cache，確保css變動立即生效
cmd /c aws cloudfront create-invalidation --distribution-id E1C89881XI6XXA --paths "/css/*"

echo ===== Done! Website Updated and Cache Cleared =====
pause
