import Utils.Utils;
import io.restassured.response.Response;
import org.testng.annotations.Test;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class CsrfTest {

    private Map<String, String> cookies = new HashMap<>();

    private final String CSRF_URL = "https://todolist-next-ts.vercel.app/api/auth/csrf";
    private final String WRONG_CSRF_URL = "https://todolist-next-ts.vercel.app/api/auth/csrff";

    @Test(priority = 1)
    void getCsrf() throws IOException {
         String csrfToken;

        Response response =
           given()
                   .header("Connection","keep-alive")
                   .when()
                .get(CSRF_URL)
        .then()
                .statusCode(200)
                .body("csrfToken",notNullValue())
                .log().all()
                   .extract().response();
    csrfToken = response.jsonPath().get("csrfToken");
    Utils.saveCSRFToken(csrfToken,"csrf.txt");
        cookies.putAll(response.getCookies());
        Utils.saveCookiesToFile(cookies,"todoListApis.txt");

        System.out.println("**********************************");

    }

    @Test(priority = 2)
    void getOptions() {

        Response response =
                given()
                        .header("Connection","keep-alive")
                        .when()
                        .options(CSRF_URL)
                        .then()
                        .statusCode(204)
                        .log().all()
                        .extract().response();
        System.out.println("COOKIES: "+response.header("Allow"));
        //cookies = response.getCookies(); // Capturar cookies
String allowedMethods = response.header("Allow");
        String[] methods = allowedMethods.split(",\\s*");
        for (String method : methods) {
            if (isValidHttpMethod(method)) {
                System.out.println("Método válido: " + method);
            } else {
                System.out.println("Método inválido: " + method);
            }
        }
        System.out.println("**********************************");

        System.out.println("**********************************");
    }

    private boolean isValidHttpMethod(String method) {
        switch (method.toUpperCase()) {
            case "GET":
            case "POST":
            case "PUT":
            case "DELETE":
            case "PATCH":
            case "HEAD":
            case "OPTIONS":
            case "TRACE":
                return true;
            default:
                return false;
        }
    }

    @Test
    void getWrongCsrf() {
        Response resp =        given()
                        .header("Connection","keep-alive")
                        .when()
                        .get(WRONG_CSRF_URL)
                        .then()
                        .statusCode(400)
                        .log().all()
                        .extract().response();

        String responseBody = resp.asString();

        if ("Bad request.".equals(responseBody)) {
            System.out.println("Se recibió el mensaje de error esperado: " + responseBody);
        } else {
            System.out.println("Mensaje de error inesperado: " + responseBody);
        }

        System.out.println("**********************************");

    }
}
