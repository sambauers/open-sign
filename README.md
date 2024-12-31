![A demonstration of the Open Sign application](https://raw.githubusercontent.com/sambauers/assets/main/open-sign/readme/open-sign-demo.gif)

# Open Sign

Open Sign is a small NodeJS application that displays pixel art on a LED matrix.

The hardware required is:

* Raspberry Pi - *probably best with at least a Raspberry Pi 3 Model B Rev 1.2*
* An RGB LED Matrix HAT for Raspberry Pi - *I use the [RGB Matrix HAT + RTC](https://www.adafruit.com/product/2345) from Adafruit, or [you can wire it up yourself](https://github.com/hzeller/rpi-rgb-led-matrix/blob/master/wiring.md)*
* An RGB LED Matrix board - *I use [this 64x32 pixel matrix](https://www.adafruit.com/product/2277) from Adafruit, but any board that complies with the [RPI RGB LED Matrix library limitations](https://github.com/hzeller/rpi-rgb-led-matrix) should work - note: that currently only one board at a time is supported or tested, so no chaining of boards (adding support should be pretty trivial, but I don't have a second board to test this)*
* A USB mouse to control the display - *use a two button mouse with a scrollwheel to get the maximum functionality*

## Installation

The application requires NodeJS v20, and setup on the Raspberry Pi can be a bit tricky.

Assuming you have Raspian installed on your Raspberry Pi, you'll need to make sure that your RGB LED Matrix HAT is installed properly and working - this could include messing around with `raspi-config` settings, check the instructions for your particular HAT.

Once things are wired up and you are confident that your Pi, HAT, and LED matrix are working, you can start installing…

First install `fnm` - we'll install it once for all users.

```sh
# switch to root
sudo -i

# make a new directory for `fnm`
mkdir /opt/fnm

# install `fnm` in the new directory, but skip installation of the user shell script
curl -fsSL https://fnm.vercel.app/install | bash -s -- --install-dir "/opt/fnm" --skip-shell
```

Create an `fnm` initialisation script for all users.

```sh
nano /etc/profile.d/fnm.sh
```

Add the follwing contents to that script:

```sh
# FNM initialization script
FNM_PATH='/opt/fnm'
if [ -d "$FNM_PATH" ]; then
  export PATH="$FNM_PATH:$PATH"
  if [ ! -t 0 ]; then
    eval "`fnm env --fnm-dir=\"$FNM_PATH\"`"
  else
    eval "`fnm env --fnm-dir=\"$FNM_PATH\" --use-on-cd --version-file-strategy=recursive --resolve-engines`"
    eval "`fnm completions`"
  fi
fi
```

Continuing as the root user, create a directory to install `open-sign`:

```sh
# make a new directory for `open-sign`
mkdir /opt/open-sign
```

Get a copy of the `open-sign` code into that new directory, it's generally a good idea to clone the Git repository:

```sh
cd /opt
git clone https://github.com/sambauers/open-sign.git open-sign
```

Install FNM for your user using [their instructions](https://github.com/Schniz/fnm?tab=readme-ov-file#installation).

Once done, install the NodeJS version required by the app and make it the default:

```sh
cd /opt/open-sign

# install the specified node version (if not prompted)
fnm install

# make the specified node version the default
fnm alias `fnm current` default

# make sure the specified version is in use
fnm use
```

Ensure `npm` and `corepack` are up-to-date - note that we are using `npm` for global packages:

```sh
npm -g install npm corepack
```

Ensure `corepack` is enabled so we can automatically use `pnpm`. `fnm` is supposed to automatically do this for us, but it doesn't hurt to make sure:

```sh
corepack enable
```

Now install dependencies (this will take a while) - accept any prompt asking you if you want to install `pnpm`:

```sh
pnpm install
```

Additionally, install `pm2` - note that this is being installed globally using `npm`:

```sh
npm -g install pm2
```

## Configuration

Open `ecosystem.config.js` and adjust the environment variables `LED_HEIGHT` and `LED_WIDTH` as needed.

```sh
# switch to root
sudo -i

# go to `open-sign` directory
cd /opt/open-sign

# open the ecosyustem file for editing
nano ecosystem.config.js
```

## Build

As root, ensure the correct Node version is being used and build the application:

```sh
# switch to root
sudo -i

# go to `open-sign` directory
cd /opt/open-sign

# ensure the right node version is in use
fnm use

# build the application
pnpm build
```

The compiled application should now be in the `/opt/open-sign/dist` directory.

## First run

Switch to the `root` user and ensure you are in the correct directory:

```sh
# switch to root
sudo -i

# go to `open-sign` directory
cd /opt/open-sign
```

Ensure the correct Node version is being used, and then start the application using `pm2`:

```sh
# ensure the right node version is in use
fnm use

# start pm2 process manager
pm2 start ecosystem.config.js --env production
```

The application will start on a blank screen. Click the left mouse button to display the first image on the RGB LED matrix.

## Controls

* Left mouse button - go to next image
* Right mouse button - go to previous image
* Scrollwheel up - increase brightness
* Scrollwheel down - decrease brightness

## Starting on boot

To start the sign automatically on boot, you can use PM2's built-in startup
script generator.

Switch to root and run the `pm2 startup` command:

```sh
# switch to root
sudo -i

# add pm2 startup script
pm2 startup
```

Most times it will install the startup script for you, but check the PM2
documentation if you get stuck.

Now you can save the current pm2 state to config. Ensure you are in the correct directory, and ensure the application is started:

```sh
# go to `open-sign` directory
cd /opt/open-sign

# ensure the right node version is in use
fnm use

# start pm2 process manager
pm2 start ecosystem.config.js --env production
```

Then simply "save" the list of running PM2 services to ensure they start on
boot:

```sh
# check the processes currently being managed by pm2
pm2 list

# save current pm2 state to config
pm2 save
```

The sign should now launch automatically on boot. If you ever want to stop running automatically on boot, you can remove the init script:

```sh
pm2 unstartup systemd
```

## Setting up run schedules

You may want to start and stop the sign at certain times of the day or week. This can be achieved by configuring `crontab`.

The simplest version of this starts and stops the application by sending signals to `pm2`.

You can edit `root`'s `crontab` file by running:

```sh
sudo crotab -e
```

Then setup start and stop actions like:

```sh
# Ensure pm2 can be found on your PATH - adjust as
# neccesary depending on your FNM/NPM binaries path
PATH=/opt/fnm/node-versions/v20.18.1/installation/bin:$PATH

# Turn the sign on at 8:30 AM, Monday to Friday
30 8 * * 1-5 pm2 sendSignal SIGUSR1 open-sign

# Turn the sign off at 4:30 PM, Monday to Friday
30 16 * * 1-5 pm2 sendSignal SIGUSR2 open-sign

# In case of power failure and reboot outside these hours, turn off the sign every 15 minutes outside those hours

# Monday to Friday before 8:30 AM
*/15 0-7 * * 1-5 pm2 sendSignal SIGUSR2 open-sign
0-25/15 8 * * 1-5 pm2 sendSignal SIGUSR2 open-sign

# Monday to Friday after 4:30 PM
35-55/15 16 * * 1-5 pm2 sendSignal SIGUSR2 open-sign
*/15 17-23 * * 1-5 pm2 sendSignal SIGUSR2 open-sign

# Saturday and Sunday
*/15 * * * 6 pm2 sendSignal SIGUSR2 open-sign
*/15 * * * 0 pm2 sendSignal SIGUSR2 open-sign
```

You may need to restart the `cron` service after editing:

```sh
sudo /etc/init.d/cron restart
```

## Adding more images

Adding more images is easy.

Simply create new images in `PNG` format at the correct dimensions for your LED matrix and drop them into the `moods` directory.

The images are loaded in alphabetical order. You can force the order of the images by utilising a number prefix. See the file names in the `moods` directory for an example of this.

The images in the moods diroctory that come with the application are 64x32 pixels.

Transparent PNGs are supported (the transparency is treated as black).

If you add new images, they won't be registered by the application until you restart the application.

```sh
sudo -i
pm2 restart open-sign
```
