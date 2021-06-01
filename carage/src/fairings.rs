use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation};
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
            "POST, GET, PATCH, OPTIONS",
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
        if let Ok(token_message) = decode::<Self>(
            &request.headers().get_one("jwt").unwrap(),
            &DecodingKey::from_secret("secret".as_ref()),
            &Validation::new(Algorithm::HS256),
        ) {
            Outcome::Success(token_message.claims)
        } else {
            Outcome::Failure((Status::Unauthorized, ()))
        }
    }
}
