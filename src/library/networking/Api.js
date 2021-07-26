export const BASE_URl = 'https://api.lenouvelliste.com/public/api/';
// https://lenouvelliste.com/api/trending
// "https://api.lenouvelliste.com/api/getarticle/{id}" 
export async function getBreakingNews() {
  let result = await fetch(BASE_URl+'breakingnews').then(
    response => response.json(),
  );
  return result.data;
}

export async function getHomeNews() {
  let result = await fetch(BASE_URl+'homenews').then(
    response => response.json(),
  );
  return result.data;
}

export async function getAllNews() {
  let result = await fetch(BASE_URl+'getallnews').then(
    response => response.json(),
  );
  return result.data;
}

// export async function getMostRead() {
//   let result = await fetch(BASE_URl+'mostread/').then(
//     response => response.json(),
//   );
//   return result.data;
// }
export async function getMostRead() {
  let result = await fetch('https://lenouvelliste.com/api/trending').then(
    response => response.json(),
  );
   return result;
}
export async function getMostDetail(id) {
  let result = await fetch(`https://api.lenouvelliste.com/api/getarticle/${id}`).then(
    response => response.json(),
  );
   return result.data;
}

export async function getCitizenTopNews() {
  let result = await fetch(BASE_URl+'topcitizennews').then(
    response => response.json(),
  );
  return result.data;
}

export async function getCitizenNews() {
  let result = await fetch(BASE_URl+'allcitizennews').then(
    response => response.json(),
  );
  return result.data;
}

export async function getSectionAll() {
  let result = await fetch(BASE_URl+'sectionall/').then(
    response => response.json(),
  );
  return result.data;
}

export async function getSectionNews(id) {
  let result = await fetch(BASE_URl+'section/' + id).then(
    response => response.json(),
  );
  return result.data;
}

export async function getCitizenMedia(id) {
  let result = await fetch(BASE_URl+'citizen_media/' + id).then(
    response => response.json(),
  );
  return result;
}
