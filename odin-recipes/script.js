document.querySelector(".toggle-nutrition").addEventListener("click", () => {
  const fullNutrition = document.querySelector(".nutrition-full");
  const nutritionSection = document.querySelector(".nutrition");
  if (
    fullNutrition.style.display === "none" ||
    fullNutrition.style.display === ""
  ) {
    fullNutrition.style.display = "block";

    setTimeout(() => {
      fullNutrition.scrollIntoView({ behavior: "smooth", block: "start" }, 100);
    });
  } else {
    nutritionSection.scrollIntoView(
      { behavior: "smooth", block: "start" },
      100
    );
    setTimeout(() => {
      fullNutrition.style.display = "none";
    }, 400);
  }
});
