import { Router } from "express";
import { ISuscribe, SuscribeModel, SuscribeSchema } from "../models/suscribe";
import { body, validationResult } from "express-validator";
import { MongoError } from "mongodb";

const routes = Router();

routes.post(
    "/verify-whatsapp",
    body("whatsapp").exists().isLength({max: 10, min: 10}),
    body("hash_whatsapp").exists(),
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            
            const findSuscribe = await SuscribeModel.findOne({
                whatsapp: req.body.whatsapp,
                hash_whatsapp: req.body.hash_whatsapp
            })

            if (findSuscribe) {
                findSuscribe.whatsapp_verified = true

                findSuscribe.save()

                return res.status(200).json({response: "Success update"})
            }

            return res.status(404).json({error: "invalid whatsapp or hash"})

        } catch (error) {
            return res.status(500).json({error: "Sorry, something went wrong :/" })
        }
    }
)

routes.post(
    "/verify-email",
    body("email").exists(),
    body("hash_email").exists(),
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            
            const findSuscribe = await SuscribeModel.findOne({
                email: req.body.email,
                hash_email: req.body.hash_email
            })

            if (findSuscribe) {
                findSuscribe.email_verified = true

                findSuscribe.save()

                return res.status(200).json({response: "Success update"})
            }

            return res.status(404).json({error: "invalid email or hash"})

        } catch (error) {
            return res.status(500).json({error: "Sorry, something went wrong :/" })
        }
    }
)

routes.post(
  "/register",
  body("name").exists(),
  body("email").isEmail(),
  body("whatsapp").isNumeric().isLength({ max: 10, min: 10 }),
  body("accept_terms").isBoolean(),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const findWhatsapp = await SuscribeModel.findOne({whatsapp: req.body.whatsapp})

      if (findWhatsapp) {
          return res.status(400).json({error: "whatsapp already exists"})
      }

      const findEmail = await SuscribeModel.findOne({email: req.body.email})

      if (findEmail) {
          return res.status(401).json({error: "email already exists"})
      }

      const suscribe = new SuscribeModel({
        name: req.body.name,
        email: req.body.email,
        whatsapp: req.body.whatsapp,
        accept_terms: req.body.accept_terms,
        email_verified: false,
        whatsapp_verified: false,
        hash_whatsapp: generateHash(10),
        hash_email: generateHash(10),
      });

      await suscribe.save();

      return res
        .status(200)
        .json({ response: "Suscribe created successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
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
