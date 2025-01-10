import Utils.Utils;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.io.IOException;
import java.util.Map;

import static io.restassured.RestAssured.given;

public class PostTest {
    private static final String TASKS_URL = "https://todolist-next-ts.vercel.app/api/tasks";
    private static final String COOKIES_FILE = "todoListApis.txt";
    private static final String CSRF_FILE = "csrf.txt";

    @Test
    void createTask() throws IOException {
        String csrfToken = Utils.readCSRFToken(CSRF_FILE);
        Map<String,String> cookies = Utils.readCookiesFromFile(COOKIES_FILE);
        String createTask = "{\"content\":\"Todos los endpoints testeados\"}";

        if (csrfToken == null || cookies == null) {
            throw new IllegalStateException("El CSRF token o Cookies no está disponible. Asegúrate de ejecutar getCsrf primero.");
        }
        Response beforeUpdated =
                given()
                        .log().all()
                        .cookies(cookies)
                        .header("Content-Type", "application/json")
                        .header("Connection","keep-alive")
                        .body(createTask)
                        .when()
                        .post(TASKS_URL)
                        .then()
                        .statusCode(201)
                        .log().all().extract().response();

        String serverMessage = beforeUpdated.path("message");
        Assert.assertEquals(serverMessage,"Task Created","Error al crear la tarea");

    }
}
