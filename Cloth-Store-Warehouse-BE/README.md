# Cloth Store Warehouse Services Back-end

This project was generated with Spring maven version Java JDK 17

## Config application.properties in module ct_start/src/resources

```
server.port=5556
spring.datasource.url=jdbc:mysql://localhost:3306/ct_warehouse
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
spring.jpa.properties.hibernate.format_sql=true
spring.mvc.cors.allowed-origins=*

portAgency = http://localhost:5555
clientFE = http://localhost:4201
adminFE =  http://localhost:4202
```
 - Database name: ct_warehouse
 - username and password in your MySQL

 Project use port local
 - portAgency = http://localhost:5555
 - clientFE = http://localhost:4201
 - adminFE =  http://localhost:4202

Note: Application.properties different to deployment server
   
## Update and run maven project:
Run `mvn clean install`

## Run and start warehouse springboot project
Run application

## Deloyment Docker
This is an instructional clip: https://youtu.be/GE7tn2l9B1E
For warehousedb : 
 - Build image for this : " docker build -t warehousedb . "

 - Create Container from image : " docker run -p 3307:3306 --name warehousedb warehousedb "

For Warehousebe you open terminal in ct-start: 
 - Build image for this : " docker build -t warehousebe . "

 - Create Container from image : " docker run -p 5556:5556 --name warehousebe warehousebe "

## Image Demo
![warehouse](https://github.com/Kaicity/Kaicity/blob/main/assets/Screenshot%202024-05-20%20005525.png)

