import Utils.Utils;
import org.testng.annotations.Test;

import java.io.IOException;
import java.util.Map;

import static io.restassured.RestAssured.given;

public class DeleteTest {

    private static final String TASKS_URL = "https://todolist-next-ts.vercel.app/api/tasks/35";
    private static final String COOKIES_FILE = "todoListApis.txt";
    private static final String CSRF_FILE = "csrf.txt";

    @Test
    void deleteTask() throws IOException {
        String csrfToken = Utils.readCSRFToken(CSRF_FILE);
        Map<String,String> cookies = Utils.readCookiesFromFile(COOKIES_FILE);
        if (csrfToken == null || cookies == null) {
            throw new IllegalStateException("El CSRF token o Cookies no está disponible. Asegúrate de ejecutar getCsrf primero.");
        }

                given()
                        .log().all() // Log completo de la solicitud
                        .cookies(cookies)
                        .redirects().follow(true) // Activar seguimiento
                        .header("Content-Type", "application/json")
                        .header("Connection","keep-alive")
                        .body("{\"type\":\"one\"}")
                        .when()
                        .delete(TASKS_URL)
                        .then()
                        .statusCode(200)
                        .log().all().extract().response();
    }
}
