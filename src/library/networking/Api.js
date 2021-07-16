// Dev Server Link
 export const APP_BASE_URL = "https://api.lenouvelliste.com/public/api/"

export async function getBreakingNews() {
  let result = await fetch(APP_BASE_URL+'breakingnews').then(
    response => response.json(),
  );
  return result.data;
}

export async function getHomeNews() {
  let result = await fetch(APP_BASE_URL+'homenews').then(
    response => response.json(),
  );
  return result.data;
}

export async function getAllNews() {
  let result = await fetch(APP_BASE_URL+'getallnews').then(
    response => response.json(),
  );
  return result.data;
}

export async function getMostRead() {
  let result = await fetch(APP_BASE_URL+'mostread/').then(
    response => response.json(),
  );
  return result.data;
}

export async function getCitizenTopNews() {
  let result = await fetch(APP_BASE_URL+'topcitizennews').then(
    response => response.json(),
  );
  return result.data;
}

export async function getCitizenNews() {
  let result = await fetch(APP_BASE_URL+'allcitizennews').then(
    response => response.json(),
  );
  return result.data;
}

export async function getSectionAll() {
  let result = await fetch(APP_BASE_URL+'sectionall/').then(
    response => response.json(),
  );
  return result.data;
}

export async function getSectionNews(id) {
  let result = await fetch(APP_BASE_URL+'section/' + id).then(
    response => response.json(),
  );
  return result.data;
}

export async function getCitizenMedia(id) {
  let result = await fetch(APP_BASE_URL+'citizen_media/' + id).then(
    response => response.json(),
  );
  return result;
}
