npm run build

# mkdir -p dist/Nexion/

# mv dist/fonts dist/Nexion/fonts
# mv dist/icons dist/Nexion/icons
# mv dist/wallpapers dist/Nexion/wallpapers
# mv dist/sounds dist/Nexion/sounds
# mv dist/Asteroids.html dist/Nexion/

cd dist
git init
git checkout -B master
git add -A
git commit -m "Deploy"
git push -f https://github.com/OrangeFalcon14/Nexion.git master:gh-pages
cd ..
