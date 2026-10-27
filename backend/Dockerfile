# Sử dụng image Node.js chính thức
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn backend vào container
COPY . .

# Mở cổng chạy ứng dụng (backend chạy cổng 5000)
EXPOSE 5000

# Lệnh để khởi chạy ứng dụng
CMD ["npm", "start"]