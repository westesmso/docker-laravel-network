const form = document.getElementById('toy-form');
const list = document.getElementById('toy-list');
const refreshBtn = document.getElementById('refresh-btn');
const authHeader = `Basic ${btoa('admin:toy123')}`;

async function loadToys() {
  const response = await fetch('/api/toys');

  if (!response.ok) {
    throw new Error('Falha ao carregar brinquedos.');
  }

  const toys = await response.json();
  list.innerHTML = '';

  toys.forEach((toy) => {
    const item = document.createElement('li');
    item.className = 'toy-item';

    const info = document.createElement('div');
    info.innerHTML = `
      <p class="toy-info"><strong>${toy.name}</strong></p>
      <p class="toy-meta">${toy.description || 'Sem descricao'} | R$ ${Number(toy.price).toFixed(2)} | Estoque: ${toy.stock}</p>
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Excluir';
    deleteBtn.addEventListener('click', async () => {
      await fetch(`/api/toys/${toy.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authHeader,
          Accept: 'application/json',
        },
      });
      await loadToys();
    });

    item.appendChild(info);
    item.appendChild(deleteBtn);
    list.appendChild(item);
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const payload = {
    name: data.get('name'),
    description: data.get('description'),
    price: Number(data.get('price')),
    stock: Number(data.get('stock')),
  };

  const response = await fetch('/api/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: authHeader,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    alert(`Erro ao salvar brinquedo: ${errorText}`);
    return;
  }

  form.reset();
  await loadToys();
});

refreshBtn.addEventListener('click', loadToys);

loadToys().catch((error) => {
  alert(error.message);
});
