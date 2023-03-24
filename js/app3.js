const email = document.getElementById("emailInput");
const tel = document.getElementById("telInput");
const prospectos = JSON.parse(localStorage.getItem("prospectos")) || [];
const cuerpoTabla = document.getElementById("cuerpoTabla");

const agregarProspecto = () => {
  const prospecto = {
    id: crypto.randomUUID(),
    email: email.value,
    tel: tel.value,
  };

  prospectos.push(prospecto);

  localStorage.setItem("prospectos", JSON.stringify(prospectos));

  console.log(prospectos);
  mostrarProspecto();
};

const mostrarProspecto = () => {
  cuerpoTabla.innerHTML = "";
  prospectos.forEach((prospecto) => {
    cuerpoTabla.innerHTML += `<tr>
            <th scope="row">${prospecto.id}</th>
            <td>${prospecto.email}</td>
            <td>${prospecto.tel}</td>
            <td>
            <a href="#editEmployeeModal" class="edit" data-toggle="modal" onclick="editarProspecto('${prospecto.id}')"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick="eliminarProspecto('${prospecto.id}')"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
            </td>
    </tr>`;
  }); 
};

const editarProspecto = (id) => {
  const prospectoIndex = prospectos.findIndex(
    (prospecto) => prospecto.id === id
  );

  if (prospectoIndex === -1) {
    console.log(`No se encontró el prospecto con ID ${id}.`);
    return;
  }

  const nuevoEmail = prompt(
    `Ingresa el nuevo correo electrónico para el prospecto con ID ${id}:`,
    prospectos[prospectoIndex].email
  );
  const nuevoTel = prompt(
    `Ingresa el nuevo número telefónico para el prospecto con ID ${id}:`,
    prospectos[prospectoIndex].tel
  );

  prospectos[prospectoIndex].email =
    nuevoEmail || prospectos[prospectoIndex].email;
  prospectos[prospectoIndex].tel = nuevoTel || prospectos[prospectoIndex].tel;

  localStorage.setItem("prospectos", JSON.stringify(prospectos));

  mostrarProspecto();
};

const eliminarProspecto = (id) => {
  prospectos.forEach((prospecto, index) => {
    if (prospecto.id === id) {
      prospectos.splice(index, 1);
    }
  });
  localStorage.setItem("prospectos", JSON.stringify(prospectos));
  mostrarProspecto();
};
