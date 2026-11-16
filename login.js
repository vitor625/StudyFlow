// ==========================================
// STUDYFLOW - LOGIN E CADASTRO
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const loginContainer = document.getElementById("login-form-container");
    const registerContainer = document.getElementById("register-form-container");

    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    const showRegister = document.getElementById("show-register");
    const showLogin = document.getElementById("show-login");

    // ==========================================
    // TROCAR PARA CADASTRO
    // ==========================================

    showRegister.addEventListener("click", (event) => {
        event.preventDefault();

        loginContainer.classList.add("hidden");
        registerContainer.classList.remove("hidden");
    });


    // ==========================================
    // TROCAR PARA LOGIN
    // ==========================================

    showLogin.addEventListener("click", (event) => {
        event.preventDefault();

        registerContainer.classList.add("hidden");
        loginContainer.classList.remove("hidden");
    });


    // ==========================================
    // MOSTRAR / ESCONDER SENHA
    // ==========================================

    const botoesSenha = document.querySelectorAll(".show-password");

    botoesSenha.forEach((botao) => {

        botao.addEventListener("click", () => {

            const idInput = botao.dataset.target;
            const input = document.getElementById(idInput);
            const icone = botao.querySelector("i");

            if (input.type === "password") {

                input.type = "text";

                icone.classList.remove("fa-eye");
                icone.classList.add("fa-eye-slash");

            } else {

                input.type = "password";

                icone.classList.remove("fa-eye-slash");
                icone.classList.add("fa-eye");
            }

        });

    });


    // ==========================================
    // CADASTRO
    // ==========================================

    registerForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const nome = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim().toLowerCase();

        const senha = document.getElementById("register-password").value;
        const confirmarSenha = document.getElementById("register-confirm-password").value;


        // Verificar senha
        if (senha !== confirmarSenha) {

            alert("As senhas não são iguais.");

            return;
        }


        // Verificar tamanho da senha
        if (senha.length < 6) {

            alert("A senha precisa ter pelo menos 6 caracteres.");

            return;
        }


        // Verificar se já existe usuário
        const usuarioExistente = localStorage.getItem("studyflow_usuario");

        if (usuarioExistente) {

            const usuario = JSON.parse(usuarioExistente);

            if (usuario.email === email) {

                alert("Este e-mail já está cadastrado.");

                return;
            }
        }


        // Criar usuário
        const novoUsuario = {
            nome: nome,
            email: email,
            senha: senha
        };


        // Salvar no navegador
        localStorage.setItem(
            "studyflow_usuario",
            JSON.stringify(novoUsuario)
        );


        alert("Conta criada com sucesso!");


        // Limpar formulário
        registerForm.reset();


        // Voltar para login
        registerContainer.classList.add("hidden");
        loginContainer.classList.remove("hidden");

        // Preencher e-mail automaticamente
        document.getElementById("login-email").value = email;

    });


    // ==========================================
    // LOGIN
    // ==========================================

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const email = document.getElementById("login-email").value.trim().toLowerCase();
        const senha = document.getElementById("login-password").value;


        // Buscar usuário
        const usuarioSalvo = localStorage.getItem("studyflow_usuario");


        if (!usuarioSalvo) {

            alert("Nenhuma conta cadastrada. Crie sua conta primeiro.");

            return;
        }


        const usuario = JSON.parse(usuarioSalvo);


        // Verificar dados
        if (email !== usuario.email || senha !== usuario.senha) {

            alert("E-mail ou senha incorretos.");

            return;
        }


        // ==========================================
        // LOGIN REALIZADO
        // ==========================================

        localStorage.setItem("studyflow_logado", "true");

        localStorage.setItem(
            "studyflow_usuario_logado",
            JSON.stringify({
                nome: usuario.nome,
                email: usuario.email
            })
        );


        // Redirecionar para o StudyFlow
        window.location.href = "index.html";

    });


    // ==========================================
    // ESQUECI MINHA SENHA
    // ==========================================

    const forgotPassword = document.getElementById("forgot-password");

    if (forgotPassword) {

        forgotPassword.addEventListener("click", (event) => {

            event.preventDefault();

            alert(
                "Recuperação de senha será adicionada posteriormente."
            );

        });

    }

});