import Utils.Utils;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;
import java.io.IOException;
import java.util.Map;

import static io.restassured.RestAssured.given;

public class LoginTest {
    private static final String LOGIN_URL = "https://todolist-next-ts.vercel.app/api/auth/callback/credentials";
    private static final String COOKIES_FILE = "todoListApis.txt";
    private static final String CSRF_FILE = "csrf.txt";
    private static final String INVALID_LOGIN_REDIRECT = "https://todolist-next-ts.vercel.app/auth/login?error=CredentialsSignin&code=credentials";
    private static final String INVALID_LOGIN_CSRF = "https://todolist-next-ts.vercel.app/auth/login?error=MissingCSRF";

    @Test
    void logIn() throws IOException {
        String csrfToken = Utils.readCSRFToken(CSRF_FILE);
        Map<String,String> cookies = Utils.readCookiesFromFile(COOKIES_FILE);
        if (csrfToken == null || cookies == null) {
            throw new IllegalStateException("El CSRF token o Cookies no está disponible. Asegúrate de ejecutar getCsrf primero.");
        }
            Response resp =
                    given()
                            .log().all() // Log completo de la solicitud
                            .cookies(cookies)
                            .redirects().follow(true) // Activar seguimiento
                            .header("Content-Type", "application/json")
                            .header("Connection","keep-alive")
                            .body("{\"csrfToken\":\""+csrfToken+"\",\"email\":\"tania@gmail.com\", \"password\":\"tania\"}")
                            .when()
                            .post(LOGIN_URL)
                            .then()
                            .statusCode(302)
                            .log().all().extract().response();
            cookies.putAll(resp.getCookies());
            Utils.saveCookiesToFile(cookies,COOKIES_FILE);

           // if (resp.getStatusCode() == 302) {
                String redirectUrl = resp.getHeader("Location");
                System.out.println("Redirigiendo a: " + redirectUrl);
                System.out.println("COKIES IN REDIRECT: " + cookies);

                // Seguir manualmente la redirección
                Response redirectedResponse =
                        given()
                                .log().all() // Log de la solicitud de redirección
                                .cookies(cookies)// Activar seguimiento
                                .redirects().follow(false) // Activar seguimiento
                                .header("Content-Type", "application/json")
                                .header("Connection","keep-alive")
                                .when()
                                .get(redirectUrl) // Realiza la solicitud GET a la URL de redirección
                                .then()
                                .statusCode(200)
                                .log().all() // Log de la respuesta
                                .extract()
                                .response();

                Assert.assertFalse(redirectedResponse.getDetailedCookies().getValue("__Secure-authjs.session-token").isEmpty());
          //  }

        System.out.println("**********************************");
        System.out.println("");

    }

    @Test
    void logInWithInvalidCsrfTokenLOGIN4() throws IOException {
        String csrfToken = Utils.readCSRFToken(CSRF_FILE);
        Map<String,String> cookies = Utils.readCookiesFromFile(COOKIES_FILE);
        if (csrfToken == null || cookies == null) {
            throw new IllegalStateException("El CSRF token o Cookies no está disponible. Asegúrate de ejecutar getCsrf primero.");
        }
        Response resp =
                given()
                        .log().all() // Log completo de la solicitud
                        .cookies(cookies)
                        .redirects().follow(false) // Activar seguimiento
                        .header("Content-Type", "application/json")
                        .header("Connection","keep-alive")
                        .body("{\"csrfToken\":\"\",\"email\":\"akiritaaa_loca@mail.com\", \"password\":\"taniaaaaaaaaaaaaaa\"}")
                        .when()
                        .post(LOGIN_URL)
                        .then()
                        .statusCode(302)
                        .log().all().extract().response();
        cookies.putAll(resp.getCookies());
        Utils.saveCookiesToFile(cookies,COOKIES_FILE);

        String redirectUrl = resp.getHeader("Location");
        Assert.assertTrue(redirectUrl.equals(INVALID_LOGIN_CSRF),"No se redirigio a la página");
        Assert.assertTrue(redirectUrl.contains("error"),"validación incorrecta");

        System.out.println("**********************************");
        System.out.println("");

    }


    @Test
    void logInWithInvalidCredentialsLOGIN5() throws IOException {
        String csrfToken = Utils.readCSRFToken(CSRF_FILE);
        Map<String,String> cookies = Utils.readCookiesFromFile(COOKIES_FILE);
        if (csrfToken == null || cookies == null) {
            throw new IllegalStateException("El CSRF token o Cookies no está disponible. Asegúrate de ejecutar getCsrf primero.");
        }
        Response resp =
                given()
                        .log().all() // Log completo de la solicitud
                        .cookies(cookies)
                        .redirects().follow(false) // Activar seguimiento
                        .header("Content-Type", "application/json")
                        .header("Connection","keep-alive")
                        .body("{\"csrfToken\":\""+csrfToken+"\",\"email\":\"tania@mail.com\", \"password\":\"tania111111111\"}")
                        .when()
                        .post(LOGIN_URL)
                        .then()
                        .statusCode(302)
                        .log().all().extract().response();
        cookies.putAll(resp.getCookies());
        Utils.saveCookiesToFile(cookies,COOKIES_FILE);

        String redirectUrl = resp.getHeader("Location");
        Assert.assertTrue(redirectUrl.equals(INVALID_LOGIN_REDIRECT),"No se redirigio a la página");
        Assert.assertTrue(redirectUrl.contains("error"),"validación incorrecta");

        System.out.println("**********************************");
        System.out.println("");

    }

    @Test
    void logInWithInvalidCredentialsLOGIN6() throws IOException {
        String csrfToken = Utils.readCSRFToken(CSRF_FILE);
        Map<String,String> cookies = Utils.readCookiesFromFile(COOKIES_FILE);
        if (csrfToken == null || cookies == null) {
            throw new IllegalStateException("El CSRF token o Cookies no está disponible. Asegúrate de ejecutar getCsrf primero.");
        }
        Response resp =
                given()
                        .log().all() // Log completo de la solicitud
                        .cookies(cookies)
                        .redirects().follow(false) // Activar seguimiento
                        .header("Content-Type", "application/json")
                        .header("Connection","keep-alive")
                        .body("{\"csrfToken\":\""+csrfToken+"\",\"email\":\"tania@mail.com\", \"password\":\"\"}")
                        .when()
                        .post(LOGIN_URL)
                        .then()
                        .statusCode(302)
                        .log().all().extract().response();
        cookies.putAll(resp.getCookies());
        Utils.saveCookiesToFile(cookies,COOKIES_FILE);

        String redirectUrl = resp.getHeader("Location");
        Assert.assertTrue(redirectUrl.equals(INVALID_LOGIN_REDIRECT),"No se redirigio a la página");
        Assert.assertTrue(redirectUrl.contains("error"),"validación incorrecta");

        System.out.println("**********************************");
        System.out.println("");

    }
}
