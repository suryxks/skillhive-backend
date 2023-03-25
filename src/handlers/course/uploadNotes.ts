import prisma from "../../db";
export const uploadNotes = async (req, res) => {
    const { notesUrl,title } = req.body;
    const { moduleId ,courseId} = req.params;
    try {
      const course = await prisma.lectureNotes.create({
        data: {
          title: title,
          notesUrl:notesUrl,
          module: {
            connect: {
              id:moduleId
            }
          },
          course: {
            connect: {
              id:courseId
            }
          }
  
        },
        include: {
          course: {
            select: {
              name: true,
              description: true,
              modules: {
                select: {
                  videos: true,
                  lectureNotes:true
                }
              }
            }
          }
        }
        
      })
      res.status(201).json({course})
    } catch (e) {
      console.error(e)
    }
  }