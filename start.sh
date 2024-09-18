bun install

rm -rf web/build
cd web
bun install
bun run build
cd ..

rm -rf build/
cp -r web/build/ ./build/

NODE_ENV=render nodemon --exec babel-node server.js --ignore public/