import { Router } from "express";
import { SuscribeModel } from "../models/suscribe";
import { body, validationResult } from "express-validator";
import { Codes, ErrorTemplate, ResponseTemplate } from "../utils/responseTemplate"

const routes = Router();

routes.post(
    "/verify-whatsapp",
    body("id").exists().isMongoId(),
    body("hash_whatsapp").exists(),
    async (req, res) => {
        try {
            const errors: any = validationResult(req);

            if (!errors.isEmpty()) {
              return ResponseTemplate(200, res, ErrorTemplate(Codes.VALIDATOR_ERROR, errors.array()), false)
            }
            
            const findSuscribe = await SuscribeModel.findOne({
                _id: req.body.id,
                hash_whatsapp: req.body.hash_whatsapp
            })

            if (findSuscribe) {
                findSuscribe.whatsapp_verified = true

                findSuscribe.save()

                return ResponseTemplate(200, res, {resposne: "Success update"}, true)
            }

            return ResponseTemplate(404, res, ErrorTemplate(Codes.SUSCRIBE_NOT_FOUND, "id or hash invalid"), false)

        } catch (error) {
            return ResponseTemplate(500, res, {}, false)
        }
    }
)

routes.post(
    "/verify-email",
    body("id").exists().isMongoId(),
    body("hash_email").exists(),
    async (req, res) => {
        try {
            const errors: any = validationResult(req);

            if (!errors.isEmpty()) {
              return ResponseTemplate(200, res, ErrorTemplate(Codes.VALIDATOR_ERROR, errors.array()), false)
            }
            
            const findSuscribe = await SuscribeModel.findOne({
                _id: req.body.id,
                hash_email: req.body.hash_email
            })

            if (findSuscribe) {
                findSuscribe.email_verified = true

                findSuscribe.save()

                return ResponseTemplate(200, res, {resposne: "Success update"}, true)
            }

            return ResponseTemplate(200, res, ErrorTemplate(Codes.SUSCRIBE_NOT_FOUND, "id or hash invalid"), false)

        } catch (error) {
            return ResponseTemplate(500, res, {}, false)
        }
    }
)

routes.post(
  "/register",
  body("name").exists(),
  body("email").isEmail(),
  body("whatsapp").isNumeric().isLength({ max: 10, min: 10 }),
  async (req, res) => {
    try {
      const errors: any = validationResult(req);

      if (!errors.isEmpty()) {
        return ResponseTemplate(200, res, ErrorTemplate(Codes.VALIDATOR_ERROR, errors.array()), false)
      }

      const findWhatsapp = await SuscribeModel.findOne({whatsapp: req.body.whatsapp})

      if (findWhatsapp) {
          return ResponseTemplate(200, res, ErrorTemplate(Codes.WHATSAPP_EXISTS, "Whatsapp already exists"), false)
      }

      const findEmail = await SuscribeModel.findOne({email: req.body.email})

      if (findEmail) {
          return ResponseTemplate(200, res, ErrorTemplate(Codes.EMAIL_EXISTS, "Email already exists"), false) //
      }

      const suscribe = new SuscribeModel({
        name: req.body.name,
        email: req.body.email,
        whatsapp: req.body.whatsapp,
        accept_terms: true,
        email_verified: false,
        whatsapp_verified: false,
        hash_whatsapp: generateHash(10),
        hash_email: generateHash(10),
      });

      await suscribe.save();

      return ResponseTemplate(200, res, {response: "Suscribe created successfully"}, true)

    } catch (error) {
      return ResponseTemplate(500, res, {}, false)
    }
  }
);

function generateHash(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default routes;
