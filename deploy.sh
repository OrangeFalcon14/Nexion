cp -R src/assets/fonts dist/src/assets/fonts
cp -R src/assets/icons dist/src/assets/icons
cp -R src/assets/wallpapers dist/src/assets/wallpapers
cp -R src/assets/sounds dist/src/assets/sounds
cp -R src/assets/Asteroids.html dist/src/assets/Asteroids.html

git add dist -f 

git commit -m "Adding dist"

git subtree push --prefix dist origin gh-pages
