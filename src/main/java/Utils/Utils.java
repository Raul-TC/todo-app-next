package Utils;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import java.io.*;
import java.lang.reflect.Type;
import java.util.Map;

public class Utils {
    private static final Gson gson = new Gson();

    public static void saveCookiesToFile(Map<String,String> cookies, String filePath) throws IOException {
        try (Writer writer = new FileWriter(filePath)) {
            gson.toJson(cookies, writer);
        }
    }


    public static Map<String, String> readCookiesFromFile(String filePath) throws IOException {
        try(Reader reader = new FileReader(filePath)) {
            Type type = new TypeToken<Map<String, String>>() {}.getType();
            return gson.fromJson(reader, type);
        }
    }

    public static void saveCSRFToken(String token, String filePath) throws IOException {
        try(BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))){
            writer.write(token);
        }
    }

    public static String readCSRFToken(String filePath) throws IOException {
        try(BufferedReader reader = new BufferedReader(new FileReader(filePath))){
            return reader.readLine();
        }
    }
}
