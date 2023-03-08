function createCard(name, description, pictureUrl, starts, ends, location) {
    return `
      <div class="card" style="border: 0; margin: 12px;">
      <div class="shadow-lg p-3 mb-5 bg-body rounded">
          <img src="${pictureUrl}" class="card-img-top"><div class="container text-center">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
            <p class="card-text">${description}</p>
          </div.
          <div class="card-footer"> ${starts} - ${ends}
        </div>
      </div>
    `;
  }

  window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {

        throw new Error("Response not ok");           
      } else {
        const data = await response.json();
        let col = 0;


        // const conference = data.conferences[0];
        // const nameTag = document.querySelector('.card-title');
        // nameTag.innerHTML = conference.name;
        for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const name = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const starts = new Date(details.conference.starts).toLocaleDateString();
          const ends = new Date(details.conference.ends).toLocaleDateString();
          const location = details.conference.location.name
          const html = createCard(name, description, pictureUrl, starts, ends, location);
          const column = document.querySelector(`#col-${col % 3}`);
          column.innerHTML += html;

          col += 1;


      }
      }
    }
  }
    catch (e) {
    console.error(e);
    }

  });
