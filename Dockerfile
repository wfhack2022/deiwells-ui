FROM nginx:alpine
# RUN npm install -g npm@8.9.0
WORKDIR C:/workspace/deiWells
COPY ./dist/deiWells /usr/share/nginx/html
EXPOSE 5000