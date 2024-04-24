import com.sun.jna.platform.linux.Mman;

public class Memoria {
    private Long emUso;
    private Long disponivel;
    private Long memorialTotal;

    public Memoria(){};
    public Memoria(Long emUso, Long disponivel, Long memorialTotal) {
        this.emUso = emUso;
        this.disponivel = disponivel;
        this.memorialTotal = memorialTotal;
    }

    public Long getEmUso() {
        return emUso;
    }

    public void setEmUso(Long emUso) {
        this.emUso = emUso;
    }

    public Long getDisponivel() {
        return disponivel;
    }

    public void setDisponivel(Long disponivel) {
        this.disponivel = disponivel;
    }

    public Long getMemorialTotal() {
        return memorialTotal;
    }

    public void setMemorialTotal(Long memorialTotal) {
        this.memorialTotal = memorialTotal;
    }

    public String toString(){
        return "\nMemoria{" +
                "emUso=" + emUso +
                ", disponivel='" + disponivel + '\'' +
                ", memorialTotal=" + memorialTotal +
                "}";
    }
}
