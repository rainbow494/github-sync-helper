pm2 delete lunch-wx-api

git -C /home/ubuntu/paul/lunch-wx-api/ pull 

cd /home/ubuntu/paul/lunch-wx-api/
npm install
npm run build-prod

cd /home/ubuntu/paul/lunch-wx-api/build_product/
npm install

pm2 start server.js -n lunch-wx-api