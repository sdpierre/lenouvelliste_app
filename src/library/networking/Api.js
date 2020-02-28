export async function getBreakingNews() {
    let result = await fetch("http://lenouvelis.com/api/breakingnews").then(response => response.json());
    return result.data;
  }
  
  export async function getHomeNews() {
    let result = await fetch("http://lenouvelis.com/api/homenews").then(response => response.json());
    return result.data;
  }