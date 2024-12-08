export async function onCreateListing(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement | null;

  if (!form) {
    console.error("Register form not found. Please try again.");
    return;
  }

  const formData = new FormData(form)
  const formEntries = Object.fromEntries(formData.entries())
  console.log("Form entries", formEntries);

  const title = formEntries.title as string | undefined
  const description = formEntries.description as string | undefined
  const endsAt = formEntries.endsAt as string | undefined
  const utcDate = endsAt ? new Date(new Date(endsAt).getTime() - new Date(endsAt).getTimezoneOffset() * 60 * 1000).toISOString() : null
  const selectedCategories = formData.getAll("category") as string[]
  const imageInputs = form.querySelectorAll('input[name="image"]') as NodeListOf<HTMLInputElement>
  const images = Array.from(imageInputs).map((image) => image.value).filter((value) => value.trim() !== "")
  
  const data = {
    title,
    description,
    endsAt: utcDate,
    tags: selectedCategories,
    media: images
  }

  console.log("Data for request body", data);

//   try {
// //
//   } catch (error) {
// //
//   } finally {
// //
//   }
  
}
