import java.util.Scanner;

public class ModelLog {
    static Scanner scanner = new Scanner(System.in);


    public void lerUserSenha() {
        System.out.println("""
                Qual função deseja realizar
                
                1 - Cadastro
                2 - Login
                3 - Nada""");
        int escolha = scanner.nextInt();
        scanner.nextLine(); // Limpar o buffer do scanner pra pegar numero da ação

        switch (escolha) {
            case 1:
                cadastro();
                break;
            case 2:
                login();
                break;
            case 3:
                System.out.println("Operação cancelada.");
                break;
            default:
                System.out.println("Opção inválida.");
                break;
        }
    }

    public void cadastro() {
        System.out.println("Cadastro de Usuário");
        System.out.print("Digite o nome de usuário: ");
        String nomeUsuario = scanner.nextLine();

        System.out.print("Digite a senha: ");
        String senha = scanner.nextLine();

        System.out.println("Usuário cadastrado com sucesso!");
        System.out.println("Nome de usuário: " + nomeUsuario);
        System.out.println("Senha: " + senha);
    }

    public void login() {
        System.out.println("Login de Usuário");
        System.out.print("Digite o nome de usuário: ");
        String nomeUsuario = scanner.nextLine();

        System.out.print("Digite a senha: ");
        String senha = scanner.nextLine();

        // falta aplicar a logica de validação e ver se quer adicionar numa lista pra validar cadastro
        System.out.println("Login realizado com sucesso!");
        System.out.println("Nome de usuário: " + nomeUsuario);
        System.out.println("Senha: " + senha);
    }
}

