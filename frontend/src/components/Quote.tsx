const Quote = () => {
  return (
    <div className=" p-3 bg-gray-200 h-screen flex justify-center">
      <div className="flex justify-center flex-col">
        <div className="text-3xl font-bold max-w-lg">
          "The customer service I received was exceptional. The support went
          above and beyond to address my concern."
        </div>
        <div className="pt-4">
          <div className="text-md font-bold">Jules Winnfeild</div>
          <div className="text-sm text-gray-500">CEO | Acme Inc</div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
