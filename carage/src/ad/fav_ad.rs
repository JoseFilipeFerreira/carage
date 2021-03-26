use crate::schema::favorite_ads;
use uuid::Uuid;

#[derive(Insertable, Queryable, Identifiable, AsExpression, PartialEq, Debug)]
#[table_name = "favorite_ads"]
#[primary_key(ad_id, user_id)]
pub struct FavoriteAd {
    ad_id: Uuid,
    user_id: String,
}
