##### knife4j

api文档自动生成工具



###### 在springboot中使用knife4j

1.  导入

    >   要先搭建好springboot的环境

    ```xml
    <dependency>
        <groupId>com.github.xiaoymin</groupId>
        <artifactId>knife4j-spring-boot-starter</artifactId>
        <version>2.0.7</version>
    </dependency>
    ```

2.  在 Appliaction.java 同级目录下创建 config/Knife4jConfiguration.java 配置文件

    ```java
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import springfox.documentation.builders.ApiInfoBuilder;
    import springfox.documentation.builders.PathSelectors;
    import springfox.documentation.builders.RequestHandlerSelectors;
    import springfox.documentation.spi.DocumentationType;
    import springfox.documentation.spring.web.plugins.Docket;
    import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc;
    
    @Configuration
    @EnableSwagger2WebMvc
    public class Knife4jConfiguration {
    
        @Bean(value = "defaultApi2")
        public Docket defaultApi2() {
            Docket docket=new Docket(DocumentationType.SWAGGER_2)
                    .apiInfo(new ApiInfoBuilder()
                            //.title("swagger-bootstrap-ui-demo RESTful APIs")
                            .description("# RESTful APIs")
                            .termsOfServiceUrl("http://www.xx.com/")
                            .contact("xx@qq.com")
                            .version("1.0")
                            .build())
                    //分组名称
                    .groupName("base")
                    .select()
                    //这里指定Controller扫描包路径, 注意这里一定要修改成自己的controller包,不然它无法检测到接口
                    .apis(RequestHandlerSelectors.basePackage("per.alice.controller"))
                    .paths(PathSelectors.any())
                    .build();
            return docket;
        }
    }
    ```

3.  随便整个接口, 并且使用 knife4j的注解进行标注

    ```java
    @Api(tags = "首页模块")
    @RestController
    public class IndexController {
    
        @ApiImplicitParam(name = "name",value = "姓名",required = true)
        @ApiOperation(value = "向客人问好")
        @GetMapping("/sayHi")
        public ResponseEntity<String> sayHi(@RequestParam(value = "name")String name){
            return ResponseEntity.ok("Hi:"+name);
        }
    }
    ```

4.  启动项目, 访问 `localhost:8080/doc.html` 查看生成的api文档