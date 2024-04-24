import com.github.britooo.looca.api.core.Looca;
import com.github.britooo.looca.api.group.memoria.Memoria;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Timer;
import java.util.TimerTask;

public class testeMemoria {
    public static void main(String[] args) {
    Timer timer = new Timer();
    Looca looca = new Looca();
    Memoria grupoDeMemoria = looca.getMemoria();
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();


    con.execute("""
    CREATE TABLE IF NOT EXISTS testeMemoria (
    emUso BIGINT,
    disponivel BIGINT,
    memorialTotal BIGINT,
    hora_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )""");

        System.out.println();

        timer.schedule( new TimerTask() {
            public void run() {
            con.update("INSERT INTO testeMemoria (emUso,disponivel,memorialTotal) VALUES (?,?,?)",
            grupoDeMemoria.getEmUso(), grupoDeMemoria.getDisponivel(), grupoDeMemoria.getTotal());
            }
        }, 0, 100*1000);
    }
}
