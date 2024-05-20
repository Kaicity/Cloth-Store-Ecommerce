# Clone 4 projects to your device
- Create new folder
- Open terminal at folder Run `$git clone https://github.com/Kaicity/Cloth-Store-Ecommerce.git`
- After clone is finished use IDE Intelliji open 4 projects:
  
`Cloth-Store-Client-FE`, `Cloth-Store-Admin-FE`, `Cloth-Store-Warehouse-BE`, `Cloth-Store-Agency-BE`
  
## Config Yaml Docker and run Docker-compose
- You need to check if the images are already in the docker desktop. Here we need 6 images including 2 FE, 2BE and 2 Database
![image](https://github.com/Kaicity/Cloth-Store-Ecommerce/assets/93094572/c5bb48b0-b055-4ff7-8e92-22436e75079a)
- Once done, you need to check in docker-compose to see if the image name configuration is the same as the name you built the image with
- Here is an example:
  ```yaml
  warehousedb:
    image: warehouse 
    ports:
      - 3307:3306
    restart: always
  
- If the image name is warehousedb, you must reconfigure it like this
  ```yaml
  warehousedb:
    image: warehousedb
    ports:
      - 3307:3306
    restart: always

- Once configured, you need to open a terminal and cd to the package containing docker-compose
- Use "docker-compose up" command to use docker-compose



