import React from 'react'

function CourseNavSingle({subject , image}) {
    return (
        <div>
             <div className="col-md-3 col-lg-2">
              <a href="#" className="course-category img d-flex align-items-center justify-content-center" style={{backgroundImage: `url(${image})`}}>
                <div className="text w-100 text-center">
                  <h3>{subject}</h3>
                  <span>3+ подкатегории</span>
                </div>
              </a>
            </div>
        </div>
    )
}

export default CourseNavSingle
