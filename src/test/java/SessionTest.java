import Utils.Utils;
import io.restassured.response.Response;
import org.testng.annotations.Test;

import java.io.IOException;
import java.util.Map;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.notNullValue;

public class SessionTest {
    private static final String GET_SESSION_URL = "https://todolist-next-ts.vercel.app/api/auth/session";

    @Test
    void getSession() throws IOException {
        Map<String,String> cookies = Utils.readCookiesFromFile("todoListApis.txt");

        if ( cookies == null) {
            throw new IllegalStateException("El CSRF token o Cookies no está disponible. Asegúrate de ejecutar getCsrf primero.");
        }

      Response resp =
              given()
                .log().all() // Log completo de la solicitud
                .cookies(cookies)
                .header("Connection","keep-alive")
                .when()
                .get(GET_SESSION_URL)
                .then()
                .statusCode(200)
                .body("user.id",notNullValue())
                .log().all().extract().response();

        String userId = resp.path("user.id");

        Utils.saveCSRFToken(userId,"authorizationID");
        System.out.println("UserID: "+userId);
    }
}
