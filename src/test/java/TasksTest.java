import Utils.Utils;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;

public class TasksTest {
    private static final String TASKS_URL = "https://todolist-next-ts.vercel.app/api/tasks";
    private static final String TASKS_BAD_URL = "https://todolist-next-ts.vercel.app/api/taskss";

    private static final String COOKIES_FILE = "todoListApis.txt";
    private static final String CSRF_FILE = "csrf.txt";

    @Test
    void getAllTasks() throws IOException {
        String csrfToken = Utils.readCSRFToken(CSRF_FILE);
        Map<String,String> cookies = Utils.readCookiesFromFile(COOKIES_FILE);
        String authorizationId = Utils.readCSRFToken("authorizationID");
        if (csrfToken == null || cookies == null) {
            throw new IllegalStateException("El CSRF token o Cookies no está disponible. Asegúrate de ejecutar getCsrf primero.");
        }

        Response resp =
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

        List<Map<String,Object>> tasks = resp.jsonPath().getList("$");
        Assert.assertNotNull(tasks,"El body no debe ser null");
    }

    @Test
    void getEmptyTasks() throws IOException {
        String csrfToken = Utils.readCSRFToken(CSRF_FILE);
        Map<String,String> cookies = Utils.readCookiesFromFile(COOKIES_FILE);
        String authorizationId = Utils.readCSRFToken("authorizationID");
        if (csrfToken == null || cookies == null) {
            throw new IllegalStateException("El CSRF token o Cookies no está disponible. Asegúrate de ejecutar getCsrf primero.");
        }

        Response resp =
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

        List<Map<String,Object>> tasks = resp.jsonPath().getList("$");
        Assert.assertTrue(tasks.size() == 0,"Este usuario si tiene tasks");
    }


    @Test
    void verifyJSONSchemaTasks() throws IOException {
        String csrfToken = Utils.readCSRFToken(CSRF_FILE);
        Map<String,String> cookies = Utils.readCookiesFromFile(COOKIES_FILE);
        String authorizationId = Utils.readCSRFToken("authorizationID");
        if (csrfToken == null || cookies == null) {
            throw new IllegalStateException("El CSRF token o Cookies no está disponible. Asegúrate de ejecutar getCsrf primero.");
        }

        Response resp =
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

        List<Map<String,Object>> tasks = resp.jsonPath().getList("$");
        Assert.assertNotNull(tasks,"El body no debe ser null");

        for (Map<String,Object> task : tasks){
            Assert.assertNotNull(task.get("id"),"Cada tarea debe tener un id");
            Assert.assertNotNull(task.get("userId"),"Cada tarea debe tener un UserId");
            Assert.assertNotNull(task.get("content"),"Cada tarea debe tener un content");
            Assert.assertNotNull(task.get("isDone"),"Cada tarea debe tener un status");
            Assert.assertNotNull(task.get("isNew"),"Cada tarea debe tener un status new");
            Assert.assertNotNull(task.get("createdAt"),"Cada tarea debe tener un createdAt");
            Assert.assertNotNull(task.get("updatedAt"),"Cada tarea debe tener un updatedAt");

        }
    }

    @Test
    void getTasksWithInvalidAuthorization() throws IOException {
        String csrfToken = Utils.readCSRFToken(CSRF_FILE);
        Map<String,String> cookies = Utils.readCookiesFromFile(COOKIES_FILE);
        String authorizationId = Utils.readCSRFToken("authorizationID");
        if (csrfToken == null || cookies == null) {
            throw new IllegalStateException("El CSRF token o Cookies no está disponible. Asegúrate de ejecutar getCsrf primero.");
        }

        Response resp =
                given()
                        .log().all()
                        .cookies(cookies)
                        .header("Content-Type", "application/json")
                        .header("Connection","keep-alive")
                        .header("Authorization",authorizationId)
                        .when()
                        .get(TASKS_URL)
                        .then()
                        .statusCode(401)
                        .log().all().extract().response();

        String noAuthorizationMessage = resp.path("message");
        //List<Map<String,Object>> tasks = resp.jsonPath().getList("$");
        Assert.assertTrue(noAuthorizationMessage.equals("No autorizado"),"El usuario se autorizó");

    }

    @Test
    void get404Error() throws IOException {
        String csrfToken = Utils.readCSRFToken(CSRF_FILE);
        Map<String,String> cookies = Utils.readCookiesFromFile(COOKIES_FILE);
        String authorizationId = Utils.readCSRFToken("authorizationID");
        if (csrfToken == null || cookies == null) {
            throw new IllegalStateException("El CSRF token o Cookies no está disponible. Asegúrate de ejecutar getCsrf primero.");
        }

                given()
                        .log().all()
                        .cookies(cookies)
                        .header("Content-Type", "application/json")
                        .header("Connection","keep-alive")
                        .header("Authorization",authorizationId)
                        .when()
                        .get(TASKS_BAD_URL)
                        .then()
                        .statusCode(404)
                        .log().all().extract().response();
    }
}
