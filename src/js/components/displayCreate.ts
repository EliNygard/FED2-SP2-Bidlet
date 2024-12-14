export function displayCreate(): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.id = "createWrapper";
  wrapper.className = "fixed inset-0 bg-white z-50 flex items-center justify-center";

  wrapper.innerHTML = `
    <div
      id="createContainer"
      class="bg-brand-default px-6 py-2 w-full md:max-w-xl flex flex-col md:my-20 text-brand-dark max-h-[90vh] overflow-y-auto"
    >
      <button class="inline-flex justify-end mt-4 md:mt-9 md:mr-6" id="closeButton">
        <span class="fa-solid fa-x text-2xl"></span>
      </button>
      <section class="flex flex-col items-center mt-11 mb-8">
        <h1 class="font-heading text-2xl md:text-3xl">New Bidlet Item</h1>
        <p class="font-body text-base max-w-sm mt-10 md:text-lg">What are you selling?</p>
        <div id="formContainer"></div> <!-- Placeholder for form -->
      </section>
    </div>
  `;

  const closeButton = wrapper.querySelector("#closeButton") as HTMLElement;
  closeButton.addEventListener("click", () => {
    history.back()
  });

  const form = document.createElement("form");
  form.id = "createForm";
  form.className = "font-body text-base md:text-lg flex flex-col gap-1 max-w-2xl mt-4 mb-12";
  form.setAttribute("name", "create");
  form.setAttribute("action", "#");

  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "title");
  titleLabel.textContent = "Title *";
  const titleInput = document.createElement("input");
  titleInput.className = "form-input mb-2";
  titleInput.type = "text";
  titleInput.id = "title";
  titleInput.name = "title";
  titleInput.required = true;
  const titleP = document.createElement("p")
  titleP.textContent = "Max 30 characters"
  titleP.className = "text-xs mb-4"

  const descLabel = document.createElement("label");
  descLabel.setAttribute("for", "description");
  descLabel.textContent = "Description";
  const descInput = document.createElement("input");
  descInput.className = "form-input mb-2";
  descInput.type = "text";
  descInput.id = "description";
  descInput.name = "description";
  const descP = document.createElement("p")
  descP.textContent = "Max 1000 characters"
  descP.className = "text-xs mb-4"

  const dateLabel = document.createElement('label');
  dateLabel.setAttribute('for', 'endsAt');
  dateLabel.className = 'mt-2';
  dateLabel.textContent = 'Auction end date and time *';

  const dateInput = document.createElement('input');
  dateInput.className = 'form-input';
  dateInput.type = 'datetime-local';
  dateInput.id = 'endsAt';
  dateInput.name = 'endsAt';
  dateInput.placeholder = 'Select when the auction ends';
  dateInput.required = true;

  const categoryLabel = document.createElement('label');
  categoryLabel.setAttribute('for', 'category');
  categoryLabel.className = 'mt-2';
  categoryLabel.textContent = 'Choose one or more categories';

  const categoryContainer = document.createElement('div');
  categoryContainer.className = 'flex flex-col gap-3 mt-1 text-base md:text-base';

  const categories = [
    { value: 'Furniture', text: 'Interior & Furniture' },
    { value: 'Fashion', text: 'Fashion & Wearables' },
    { value: 'Art', text: 'Art & Design' },
    { value: 'Sports', text: 'Outdoors & Sports' },
    { value: 'Books', text: 'Books' },
    { value: 'Devices', text: 'Devices' },
  ];

  categories.forEach((category) => {
    const categoryWrapper = document.createElement('label');
    categoryWrapper.className = 'flex items-center gap-2 py-2 pr-2';
    categoryWrapper.setAttribute("for", category.value)

    const categoryInput = document.createElement('input');
    categoryInput.type = 'checkbox';
    categoryInput.name = category.value;
    categoryInput.id = category.value;
    categoryInput.value = category.value;

    categoryWrapper.appendChild(categoryInput);
    categoryWrapper.appendChild(document.createTextNode(category.text));

    categoryContainer.appendChild(categoryWrapper);
  });

  const createImageInput = (id: string) => {
    const imageLabel = document.createElement('label');
    imageLabel.setAttribute('for', id);
    imageLabel.className = 'mt-2';
    imageLabel.textContent = 'Add image';

    const imageInput = document.createElement('input');
    imageInput.className = 'form-input mb-2';
    imageInput.type = 'text';
    imageInput.id = id;
    imageInput.name = 'image';

    return { label: imageLabel, input: imageInput };
  };

  const image1 = createImageInput('image');
  const image2 = createImageInput('image2');
  const image3 = createImageInput('image3');

  const requiredNote = document.createElement('p');
  requiredNote.className = 'text-brand-light text-xs md:text-sm';
  requiredNote.textContent = '* Required';

  const submitButton = document.createElement('button');
  submitButton.className = 'btn btn-accent btn-big mt-12';
  submitButton.type = 'submit';
  submitButton.textContent = 'Publish';

  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(titleP)
  form.appendChild(descLabel);
  form.appendChild(descInput);
  form.appendChild(descP)
  form.appendChild(dateLabel);
  form.appendChild(dateInput);
  form.appendChild(categoryLabel);
  form.appendChild(categoryContainer);
  form.appendChild(image1.label);
  form.appendChild(image1.input);
  form.appendChild(image2.label);
  form.appendChild(image2.input);
  form.appendChild(image3.label);
  form.appendChild(image3.input);
  form.appendChild(requiredNote);
  form.appendChild(submitButton);

  const formContainer = wrapper.querySelector("#formContainer") as HTMLElement;
  formContainer.appendChild(form);

  return wrapper;
}
