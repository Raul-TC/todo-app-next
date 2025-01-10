import Utils.Utils;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.io.IOException;
import java.util.Map;

import static io.restassured.RestAssured.given;

public class PatchTest {
    private static final String TASKS_URL = "https://todolist-next-ts.vercel.app/api/tasks/41";
    private static final String COOKIES_FILE = "todoListApis.txt";
    private static final String CSRF_FILE = "csrf.txt";


    @Test
    void updateTask() throws IOException {
        String csrfToken = Utils.readCSRFToken(CSRF_FILE);
        Map<String,String> cookies = Utils.readCookiesFromFile(COOKIES_FILE);
        String authorizationId = Utils.readCSRFToken("authorizationID");

        String updateTask = "{\"content\":\"PRUEBA AUTOMATIZADA NOT EQUALS aaaa\"}";

        if (csrfToken == null || cookies == null) {
            throw new IllegalStateException("El CSRF token o Cookies no está disponible. Asegúrate de ejecutar getCsrf primero.");
        }
        Response beforeUpdated =
                given()
                        .log().all()
                        .cookies(cookies)
                        .header("Content-Type", "application/json")
                        .header("Connection","keep-alive")
                        .header("Authorization",authorizationId)
                        .when()
                        .get(TASKS_URL)
                        .then()
                        .statusCode(200)
                        .log().all().extract().response();

    String contentBefore = beforeUpdated.path("content");
        Assert.assertNotNull(beforeUpdated.path("content"),"content no debe ser null");


        Response resp =
                given()
                        .log().all()
                        .cookies(cookies)
                        .header("Content-Type", "application/json")
                        .header("Connection","keep-alive")
                        .header("Authorization",authorizationId)
                        .body(updateTask)
                        .when()
                        .patch(TASKS_URL)
                        .then()
                        .statusCode(200)
                        .log().all().extract().response();

        String afterContent = resp.path("content");

        Assert.assertNotEquals(contentBefore,afterContent,"el contenido es igual");

        System.out.println("Before: "+contentBefore+"\n After: "+afterContent)
        ;
        Assert.assertNotNull(resp.path("$"),"El body no debe ser null");
        Assert.assertNotNull(resp.path("id"),"id no debe ser null");
        Assert.assertNotNull(resp.path("userId"),"userId no debe ser null");
        Assert.assertNotNull(resp.path("content"),"content no debe ser null");
        Assert.assertNotNull(resp.path("isDone"),"status no debe ser null");
        Assert.assertNotNull(resp.path("isNew"),"status new no debe ser null");
        Assert.assertNotNull(resp.path("createdAt"),"createdAt no debe ser null");
        Assert.assertNotNull(resp.path("updatedAt"),"updatedAt no debe ser null");
    }
}
