import fetch, {
    Blob,
    Headers,
    Request,
    RequestInit,
    Response,
    FetchError,
} from "node-fetch";

require("dotenv").config();

const linkWhatsappApi =
  "https://graph.facebook.com/v14.0/105490878890575/messages";
const linkFacebookApi =
  "https://graph.facebook.com/v15.0/100457559453071/feed?message=";

export const PostFacebook = (DataPost: any) => {
  const textMensage =
    "ALERTA DE GRADO " +
    DataPost.degree_phenomenon +
    "\n\n" +
    "Atención." +
    "\n" +
    "Alerta de " +
    DataPost.sensor_phenomenon +
    "." +
    "\n\n" +
    "Nuestros sensores detectaron " +
    DataPost.value_sensor_phenomenon +
    " (" +
    DataPost.units_phenomenon +
    ") de " +
    DataPost.sensor_phenomenon +
    " en el " +
    DataPost.site_phenomenon +
    "." +
    "\n\n" +
    "Haz click para ver la ubicación del evento." +
    "\n\n" +
    "https://www.google.com/maps/@" +
    DataPost.latitude_phenomenon +
    "," +
    DataPost.longitude_phenomenon +
    ",15.63z";

  const messageEncoded = encodeURI(textMensage);

  fetch(
    linkFacebookApi + messageEncoded + "&access_token=" + process.env.FACEBOOK_TOKEN,
    {
      method: "POST",
    }
  );
};

export const SendWhatsapp =  async (DataPost: any) => {
  const response = await fetch(linkWhatsappApi, {
    method: "POST",
    headers: {
      Authorization: "" + process.env.WHATSAPP_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: "573112024590",
      type: "template",
      template: {
        name: "cartalerta3",
        language: {
          code: "es",
        },
        components: [
          {
            type: "header",
            parameters: [
              {
                type: "text",
                text: DataPost.degree_phenomenon,
              },
            ],
          },
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: DataPost.sensor_phenomenon,
              },
              {
                type: "text",
                text: DataPost.value_sensor_phenomenon,
              },
              {
                type: "text",
                text: DataPost.units_phenomenon,
              },
              {
                type: "text",
                text: DataPost.site_phenomenon,
              },
            ],
          },
          {
            type: "button",
            index: "0",
            sub_type: "url",
            parameters: [
              {
                type: "text",
                text:
                  "@" +
                  DataPost.latitude_phenomenon +
                  "," +
                  DataPost.longitude_phenomenon +
                  ",20z",
              },
            ],
          },
        ],
      },
    }),
  }
  );

  console.log(response)
};
