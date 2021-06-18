use jsonwebtoken::{decode, DecodingKey, Validation};
use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::http::Status;
use rocket::request::{FromRequest, Outcome, Request};
use rocket::Response;
use serde::{Deserialize, Serialize};

#[options("/<idk..>")]
pub async fn cors(idk: std::path::PathBuf) -> Option<()> {
    let _ = idk;
    Some(())
}

pub struct Cors();

#[rocket::async_trait]
impl Fairing for Cors {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to requests",
            kind: Kind::Response,
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new(
            "Access-Control-Allow-Methods",
            "POST, GET, PATCH, OPTIONS, DELETE",
        ));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

#[database("carage")]
pub struct Db(pub diesel::PgConnection);

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub email: String,
}

pub struct Auth(String);

#[rocket::async_trait]
impl<'r> FromRequest<'r> for Claims {
    type Error = ();
    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        let v = Validation {
            validate_exp: false,
            ..Default::default()
        };
        let jwt = request.headers().get_one("jwt");
        if jwt.is_none() {
            return Outcome::Failure((Status::Unauthorized, ()));
        }
        match decode::<Self>(
            jwt.unwrap(),
            &DecodingKey::from_secret(b"secret".as_ref()),
            &v,
        ) {
            Ok(token_message) => Outcome::Success(token_message.claims),
            Err(_) => Outcome::Failure((Status::Unauthorized, ())),
        }
    }
}

#[derive(Serialize, Deserialize, Default, Eq, PartialEq, Clone, Debug)]
pub struct Page {
    pub page: i64,
    pub size: i64,
}
