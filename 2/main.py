from tkinter import *
from PIL import Image, ImageTk

img1 = '1.png'
img2 = '2.jpeg'
result_img = 'result.jpg'


def blend(source_path, target_path, source_image_koef, save_path):
    target_image_koef = 1 - source_image_koef
    source_data = Image.open(source_path)
    target_data = Image.open(target_path)
    source_data = source_data.resize((target_data.size[0], target_data.size[1]))
    source_pixels = source_data.load()
    target_pixels = target_data.load()
    for x in range(source_data.size[0]):
        for y in range(source_data.size[1]):
            source_pixel = source_pixels[x, y]
            target_pixel = target_pixels[x, y]
            red = target_pixel[0] * target_image_koef + source_pixel[0] * source_image_koef
            green = target_pixel[1] * target_image_koef + source_pixel[1] * source_image_koef
            blue = target_pixel[2] * target_image_koef + source_pixel[2] * source_image_koef
            target_pixels[x, y] = (int(red), int(green), int(blue))
    target_data.save(save_path)


def show_interface():
    root = Tk()
    root.title('Exam Task 2')

    img1_opened = Image.open(img1)
    img2_opened = Image.open(img2)
    result_img_opened = Image.open(result_img)

    i1 = ImageTk.PhotoImage(img1_opened.resize((250, 250), Image.ANTIALIAS))
    i2 = ImageTk.PhotoImage(img2_opened.resize((250, 250), Image.ANTIALIAS))
    result = ImageTk.PhotoImage(result_img_opened.resize((250, 250), Image.ANTIALIAS))

    panel1 = Label(root, image=i1)
    panel1.pack(side="left")

    panel3 = Label(root, image=result)
    panel3.pack(side="right")

    panel2 = Label(root, image=i2)
    panel2.pack(side="right")

    root.mainloop()


blend(img1, img2, 0.5, result_img)
show_interface()

