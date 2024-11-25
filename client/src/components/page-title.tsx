

function PageTitle({title}:{title:string}) {
  return (
    <div>
      <h1 className='text-2xl font-bold text-primary uppercase'>
        {title}
      </h1>
    </div>
  )
}

export default PageTitle
