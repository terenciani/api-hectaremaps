"use strict";

const Database = require("../database/Connection")

module.exports = class HomeService {

    static async getData() {
        try {
            return {
                hero: {
                    title: 'Hectare Maps',
                    subtitle: 'Plataforma de processamento de imagens com drones',
                    background: 'bg_main.jpg'
                },
                about: {
                    title: 'Quem somos',
                    text: `<p class="subheading ma-5 text-justify">
                                Hectare Agro ® é uma empresa sediada em Dourados-MS que
                                presta serviços de processamento de imagens e análises
                                agronômicas através da plataforma Hectare Maps. Para
                                solicitar nossos serviços, primeiro faça seu cadastro no
                                site e envie as imagens que tirou com o drone clicando no
                                botão “Enviar imagens”.
                            </p>
                            <p class="subheading ma-5 text-justify">
                                No formulário que irá se abrir, selecione as imagens que
                                serão enviadas e escolha quais serviços de processamento ou
                                análise que você deseja. Depois é só aguardar o nosso
                                contato, dentro de 48 horas todas suas imagens estarão
                                processadas e disponíveis na plataforma e no email para
                                download. Conheça mais sobre cada um de nossos serviços no
                                portfólio abaixo.
                            </p>`,
                },
                service: {
                    title: 'Nossos Serviços',
                    background: 'bg_services.jpeg',
                },
                plan: {
                    title: 'Conheça Nosos Planos',
                },
                video: {
                    title: 'Equipamentos de Última Geração',
                    src: 'drone-lancamento.mp4',
                    background: 'bg_video.jpg'
                },
                contact: {
                    title: 'Contate-nos',
                    email: 'hectaremaps@hectaremaps.com',
                    address: 'Dourados-MS, Brasil',
                    phone: '+55 (67) 98167-9726',
                    instagram: '',
                    twitter: '',
                    facebook: '',
                    pinterest: ''
                }
            }
        } catch (error) {
            throw new Error("HomeService.getData: " + error);
        }
    } // getData()
} // class