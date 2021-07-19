export async function getBreakingNews() {
  let result = await fetch('https://api.lenouvelliste.com/api/breakingnews').then(
    response => response.json(),
  );
  return result.data;
}

export async function getHomeNews() {
  let result = await fetch('https://api.lenouvelliste.com/api/homenews').then(
    response => response.json(),
  );
  return result.data;
}

export async function getAllNews() {
  let result = await fetch('https://api.lenouvelliste.com/api/getallnews').then(
    response => response.json(),
  );
  return result.data;
}

export async function getMostRead() {
  let result = await fetch('https://api.lenouvelliste.com/api/mostread/').then(
    response => response.json(),
  );
  return result.data;
}

export async function getCitizenTopNews() {
  let result = await fetch('https://api.lenouvelliste.com/api/topcitizennews').then(
    response => response.json(),
  );
  return result.data;
}

export async function getCitizenNews() {
  let result = await fetch('https://api.lenouvelliste.com/api/allcitizennews').then(
    response => response.json(),
  );
  return result.data;
}

export async function getSectionAll() {
  let result = await fetch('https://api.lenouvelliste.com/api/sectionall/').then(
    response => response.json(),
  );
  return result.data;
}

export async function getSectionNews(id) {
  let result = await fetch('https://api.lenouvelliste.com/api/section/' + id).then(
    response => response.json(),
  );
  return result.data;
}

export async function getCitizenMedia(id) {
  let result = await fetch('https://api.lenouvelliste.com/public/api/citizen_media/' + id).then(
    response => response.json(),
  );
  return result;
}
